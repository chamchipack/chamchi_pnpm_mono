const page = ({ params }) => {
  console.info(params);
  return (
    <>
      <div style={{ width: '100%', height: 40, background: 'blue' }}></div>
      <div style={{ width: '100%', height: 340, background: 'red' }}></div>
      <div style={{ width: '100%', height: 300, background: 'gray' }}></div>
      <div style={{ width: '100%', height: 200, background: 'blue' }}></div>
    </>
  );
};

export default page;
