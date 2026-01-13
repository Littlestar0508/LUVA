# 💜 LUVA

> **LUVA**는 프로필 기반 매칭과 실시간 채팅을 제공하는  
**모바일 퍼스트 소개팅 웹 애플리케이션**입니다.  
OAuth 로그인부터 프로필 관리, 매칭, 채팅까지  
**실제 서비스 운영을 가정한 구조와 UX**를 목표로 개발되었습니다.

---

## 📌 프로젝트 주제

LUVA는 단순한 UI 데모가 아닌,  
**실제 소개팅 서비스 흐름을 고려한 매칭 플랫폼**을 목표로 합니다.

### 기획 의도
- Google OAuth 기반 로그인
- 사용자 프로필 중심의 매칭 경험
- 좋아요 및 실시간 채팅 기능 구현
- 모바일 환경을 우선으로 한 UX/UI 설계

### 핵심 포인트
- Supabase(Auth / DB / Storage)를 활용한 풀스택 구조
- 실시간 데이터 처리 (채팅)
- 로그인 상태에 따른 라우팅 가드 설계
- Zustand 기반 전역 상태 관리 및 persist 활용

---

## 🛠 기술 스택

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- Zustand
- TanStack Query (부분 도입)

### Backend / BaaS
- Supabase
  - Auth (Google OAuth)
  - Database (PostgreSQL)
  - Storage (프로필 이미지)
  - Realtime (채팅)

### Infra
- Vercel (배포)

---

## 📂 페이지별 기능 설명

### 🔐 Login (`/login`)
- Google OAuth 로그인
- 로그인 상태일 경우 접근 차단 (`LoginGuard`)
- Supabase Auth 기반 세션 관리

---

### 🏠 Home (`/home`)
- 로그인한 사용자 메인 화면
- 프로필 이미지, 닉네임, 취미, 위치 정보 표시
- 받은 좋아요 수 확인
- 프로필 편집 및 매칭 페이지 이동

---

### 🔍 Search (`/search`)
- 다른 사용자 프로필 탐색
- 매칭을 위한 사용자 리스트 제공
- 좋아요 기능 확장 고려

---

### 💬 Chat (`/chat`)
- 채팅방 목록 화면
- 마지막 메시지 및 시간 표시
- 채팅방 진입 기능

---

### 🗨 ChatContent (`/chat-content`)
- 특정 사용자와의 1:1 채팅 화면
- Supabase Realtime 기반 실시간 메시지 송수신
- 메시지 정렬 및 UI 처리

---

### 👤 MyPage (`/mypage`)
- 내 프로필 정보 확인
- 프로필 수정 페이지 이동
- 로그아웃 기능 제공

---

### ✏️ EditProfile (`/edit-profile`)
- 닉네임, 취미, 위치 정보 수정
- 프로필 이미지 업로드
  - Supabase Storage 사용
  - `upsert`를 통한 이미지 덮어쓰기
- 수정 즉시 전역 상태 반영 (Zustand)

---

## 🔒 인증 & 라우팅 구조

- **RequireLogin**
  - 로그인하지 않은 사용자의 보호 페이지 접근 차단
- **LoginGuard**
  - 로그인 상태에서 로그인 페이지 접근 방지
- Supabase `onAuthStateChange`를 통해 로그인 상태 동기화

---

## 🧠 상태 관리 설계

- **AuthStatusStore**
  - 로그인 여부 및 로딩 상태 관리
- **UserProfileStore**
  - 사용자 프로필 정보 관리
  - `persist`를 통한 새로고침 대응
- Supabase 세션을 단일 진실(Source of Truth)로 사용

---

## 🚀 배포

- Vercel을 통한 배포
- SPA 환경을 위한 rewrite 설정 적용
- OAuth 리다이렉션 대응

---

## ✨ 프로젝트를 통해 얻은 경험

- OAuth 인증 흐름 및 리다이렉션 구조 이해
- Supabase Auth / Realtime 실전 활용
- React Router 기반 인증 가드 설계
- Zustand + persist 상태 관리 패턴
- 모바일 퍼스트 UI 설계
- 배포 환경에서의 SPA 라우팅 이슈 해결

---

## 🔮 향후 개선 예정
- 좋아요 기능 고도화
- 매칭 로직 개선
- 채팅 UX 개선 (읽음 처리, 알림)
- 접근성(A11y) 개선
- 테스트 코드 도입
