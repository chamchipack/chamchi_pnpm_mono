const updateStatus = async (id: string, status: boolean) => {
  return await fetch(`/api/students/status/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentStatus: status,
    }),
  });
};

export default updateStatus;
