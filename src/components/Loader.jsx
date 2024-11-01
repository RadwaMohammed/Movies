const Loader = () => {
  return (
    <div className="loader position-fixed top-0 start-0 w-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
