// Import SweetAlert library
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.scss';

interface ToastProps {
    icon: 'success' | 'error' | 'warning' | 'info' | 'question';
    title: string | object;
}

const alertToast = ({ icon, title } : ToastProps) => {
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  }).fire({
    icon: icon,
    title: title,
  });
};

// Export the function
export { alertToast };
