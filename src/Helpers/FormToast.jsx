import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function FormToast(errors) {
  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        toast.error(errors[field].message);
      }
    });
  }, [errors]);
}
