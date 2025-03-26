import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // ✅ ใช้ inject() เพื่อดึง Router
  const token = localStorage.getItem('authToken'); 
  const currentUrl = state.url;

  if (!token) {
    router.navigate(['/login']); // ถ้าไม่มี Token ให้ Redirect ไป /login
    return false;
  }
  else if (token && currentUrl === '/login') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
