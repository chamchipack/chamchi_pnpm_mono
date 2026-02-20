export async function createStudent(data: any) {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('학생 생성 실패');
  }

  return res.json();
}

export async function updateStudent(id: string, data: any) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('학생 수정 실패');
  }

  return res.json();
}

export async function deleteStudent(id: string) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '학생 삭제 실패');
  }

  return res.json();
}
