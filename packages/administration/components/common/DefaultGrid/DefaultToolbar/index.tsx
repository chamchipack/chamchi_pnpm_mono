'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Info,
  Wrench,
  Trash2,
  FileSpreadsheet,
  Layers,
  Plus,
} from 'lucide-react';
import { studentDataModel } from '@/lib/type/Student';
import { getStudents } from '@/lib/api/students';
import json2xlsx from '@/config/utils/xlsx/xlsx';

interface Props {
  onClickRegister: () => void;
  isRegisterOn?: boolean;
  onClickDelete: (id: string) => void;
  isDeleteOn?: boolean;
  rowId: string;
}

const baseBtn =
  'flex items-center gap-2 px-2 py-1 rounded-md border text-xs transition';

const DefaultToolbar = forwardRef(
  (
    {
      onClickRegister,
      onClickDelete,
      isRegisterOn = false,
      isDeleteOn = true,
      rowId,
    }: Props,
    ref,
  ) => {
    function flattenObject(obj: any, parentKey = '', result: any = {}): any {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;

          if (
            typeof obj[key] === 'object' &&
            obj[key] !== null &&
            !Array.isArray(obj[key])
          ) {
            flattenObject(obj[key], newKey, result);
          } else {
            result[newKey] = obj[key];
          }
        }
      }
      return result;
    }

    const writeExcelFile = async () => {
      const data = (await getStudents()) || [];
      if (!data.length) return;

      const exception = ['id'];

      const result = data.map((item: any, index: number) => {
        const form: any = { 순번: index + 1 };
        const flat: any = flattenObject(item);

        Object.entries(flat).forEach(([k, v]: [string, any]) => {
          if (studentDataModel[k] && !exception.includes(k)) {
            switch (k) {
              case 'currentStatus':
                form[studentDataModel[k]] = v ? '재원' : '퇴원';
                break;
              case 'paymentType':
                form[studentDataModel[k]] =
                  v === 'lesson' ? '회차결제' : '정기결제';
                break;
              case 'lessonBasedPayment.isPaid':
                form[studentDataModel[k]] = v ? '결제됨' : '미결제';
                break;
              case 'type':
                form[studentDataModel[k]] = v === 'lesson' ? '레슨' : '수업';
                break;
              default:
                form[studentDataModel[k]] = v;
            }
          }
        });
        return form;
      });

      json2xlsx(result, '수강생엑셀');
    };

    return (
      <>
        <div className="flex justify-end w-full mt-2 flex-wrap gap-2 px-2">
          <button
            className={`${baseBtn} border-green-500 text-green-600 hover:bg-green-50`}
            onClick={writeExcelFile}
          >
            <FileSpreadsheet size={16} />
            엑셀출력
          </button>

          {/* <button
          className={`${baseBtn} border-yellow-500 text-yellow-600 hover:bg-yellow-50`}
        >
          <Layers size={16} />
          일괄등록
        </button> */}

          {isRegisterOn && (
            <button
              className={`${baseBtn} border-blue-500 text-blue-600 hover:bg-blue-50`}
              onClick={onClickRegister}
            >
              <Plus size={16} />
              등록
            </button>
          )}

          {/* <button
          className={`${baseBtn} border-indigo-500 text-indigo-600 hover:bg-indigo-50`}
        >
          <Wrench size={16} />
          수정
        </button> */}

          {rowId && isDeleteOn && (
            <button
              className={`${baseBtn} border-red-500 text-red-600 hover:bg-red-50`}
              onClick={() => onClickDelete(rowId)}
            >
              <Trash2 size={16} />
              삭제
            </button>
          )}
        </div>
      </>
    );
  },
);

export default DefaultToolbar;
