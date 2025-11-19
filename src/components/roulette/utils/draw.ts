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
  const fontSize = Math.max(14, Math.floor(radius / 10));
  ctx.font = `bold ${fontSize}px 'Pretendard', sans-serif`;

  const maxTextWidth = radius * 0.7;

  items.forEach((item, i) => {
    const angle = arc * i - Math.PI / 2;
    const nextAngle = arc * (i + 1) - Math.PI / 2;

    ctx.beginPath();
    ctx.fillStyle = itemColors[i % itemColors.length];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, nextAngle);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textAngle = angle + arc / 2;
    const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
    const textY = centerY + Math.sin(textAngle) * (radius * 0.65);

    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);

    let fontSize = Math.max(12, Math.floor(radius / 14));
    ctx.font = `bold ${fontSize}px 'Pretendard', sans-serif`;

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

    let name = item.name;
    if (ctx.measureText(name).width > maxTextWidth) {
      let truncated = name;
      while (
        ctx.measureText(truncated + '...').width > maxTextWidth &&
        truncated.length > 0
      ) {
        truncated = truncated.slice(0, -1);
      }
      name = truncated + '...';
    }

    ctx.fillText(name, 0, 0);
    ctx.restore();
  });

  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};
