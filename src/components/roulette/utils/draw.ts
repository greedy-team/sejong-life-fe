import type { Place } from '../model/types';

export const drawRoulette = (
  ctx: CanvasRenderingContext2D,
  items: Place[],
  itemColors: string[],
) => {
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const arc = items.length > 0 ? (2 * Math.PI) / items.length : 0;

  ctx.clearRect(0, 0, width, height);

  items.forEach((item, i) => {
    const angle = arc * i - Math.PI / 2;
    const nextAngle = arc * (i + 1) - Math.PI / 2;

    //룰렛 배경색
    ctx.beginPath();
    ctx.fillStyle = '#F8FFF8';
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, nextAngle);
    ctx.fill();
    ctx.closePath();

    //경계선
    ctx.strokeStyle = '#DADADA';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    //각도 따라 글씨 크기 동적 계산
    let baseFontSize = Math.floor(radius / 14); // 기본 사이즈
    let fontSize = baseFontSize;

    if (arc < 0.3) {
      fontSize = 0;
    } else if (arc < 0.5) {
      fontSize *= 0.4;
    } else if (arc < 1.0) {
      fontSize *= 0.6;
    } else if (arc < 1.5) {
      fontSize *= 0.8;
    }

    if (fontSize < 8) fontSize = 8;

    ctx.save();
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textAngle = angle + arc / 2;
    const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
    const textY = centerY + Math.sin(textAngle) * (radius * 0.65);

    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);

    if (fontSize === 0) {
      ctx.font = `bold 12px Pretendard`;
      ctx.fillText('⁝', 0, 0);
    } else {
      ctx.font = `bold ${fontSize}px Pretendard`;
    }

    const maxTextHeight = radius * 0.55;
    const lineHeight = fontSize * 0.9;

    let chars = item.name.split('');

    const maxChars = Math.floor(maxTextHeight / lineHeight);

    if (chars.length > maxChars) {
      chars = chars.slice(0, maxChars - 1);
      chars.push('⁝');
    }

    const finalHeight = chars.length * (fontSize + 2);
    const startY = -(finalHeight / 2) + fontSize / 2;

    chars.forEach((c, idx) => {
      ctx.fillText(c, 0, startY + idx * (fontSize + 2));
    });

    ctx.restore();
  });

  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};
