import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <div className="spinner">
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#A4133C"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>
);