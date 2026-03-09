import PlaceSearchContainer from '../features/admin/components/PlaceSearchContainer';
import HeaderWithBack from '../components/share/HeaderWithBack';

function AdminPlacesPage() {
  return (
    <>
      <HeaderWithBack title={'장소 관리'} fallbackPath={`/admin`} />
      <PlaceSearchContainer />;
    </>
  );
}
export default AdminPlacesPage;
