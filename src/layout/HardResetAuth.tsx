// 이후 삭제할 예정

import { supabase } from "../utils/SupabaseClient";

export async function hardResetAuth() {
  try {
    // 1) Supabase signOut (서버/클라 세션 정리)
    await supabase.auth.signOut();

    // 2) Supabase 토큰이 보관되는 로컬 저장소 강제 삭제
    // (프로젝트마다 키가 'sb-<project-ref>-auth-token' 형태)
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("sb-") && k.endsWith("-auth-token")) {
        localStorage.removeItem(k);
      }
    });

    // 혹시 sessionStorage도 쓰는 경우 대비
    Object.keys(sessionStorage).forEach((k) => {
      if (k.startsWith("sb-") && k.endsWith("-auth-token")) {
        sessionStorage.removeItem(k);
      }
    });

    // 3) URL에 남아있는 해시 토큰 제거 (/#access_token=... 방지)
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    // 4) 완전 새로고침
    window.location.assign("/");
  } catch (e) {
    console.error("hardResetAuth error:", e);
    // 최후의 수단
    localStorage.clear();
    sessionStorage.clear();
    window.location.assign("/");
  }
}
