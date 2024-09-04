# SMOSCO-SOCIAL 웹 서비스 개발

**Next.js** 기반의 소셜 미디어 애플리케이션으로, **Prisma ORM**과 **관계형 데이터베이스**를 활용하여 사용자 관리, 게시물 관리, 팔로우 시스템, 그리고 스토리 기능 등을 구현했습니다.

## 배포 링크
[SMOSCO-SOCIAL 웹 서비스](https://smoscosocial.site/)

## 기술 스택
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Prisma, Cloudinary, Clerk
- **Database**: MySQL

## 주요 기능
- **팔로우 시스템**: 팔로우 요청을 보내고, 수신자가 요청을 수락하면 팔로워가 됩니다.
- **스토리 기능**: 사용자는 24시간 후에 사라지는 스토리를 게시할 수 있습니다.
- **차단 기능**: 사용자는 다른 사용자를 차단할 수 있으며, 차단된 사용자 간의 상호작용은 제한됩니다.
- **낙관적 UI 업데이트**: 댓글, 팔로우, 좋아요 기능에 낙관적 업데이트를 도입하여, 서버 응답을 기다리지 않고 사용자에게 즉각적인 피드백을 제공해 반응성을 높였습니다.
- **반응형 디자인**: 다양한 디바이스에서 최적의 사용자 경험을 제공하기 위해 Tailwind CSS를 사용해 반응형 UI를 구현했습니다. 각기 다른 화면 크기에 맞춰 레이아웃이 자동으로 조정되도록 했습니다.
- **Clerk 인증 및 프로필 관리**: 사용자 인증 상태에 따라 맞춤형 UI를 제공하며, 사용자가 프로필 이미지 및 커버 이미지를 업데이트할 수 있는 기능을 구현했습니다.
- **Prisma와 서버리스 API**: Prisma를 활용해 데이터베이스와 통신하며, 서버리스 API를 통해 효율적이고 확장 가능한 데이터 관리 및 쿼리 처리를 구현했습니다.

## 설치 및 실행 방법

1. **클론 저장소**:
    ```bash
    git clone https://github.com/smosco/next-social.git
    cd next-social
    ```

2. **패키지 설치**:
    ```bash
    npm install
    ```

3. **환경 변수 설정**:
   - `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다. 
   - 예시:
     ```makefile

해당 파일은 보안에 민감한 정보를 포함하고 있으므로, 절대로 그대로 공개 저장소나 README 파일에 올리면 안 됩니다. 일반적으로, 보안에 민감한 키와 같은 정보는 .env 파일로 관리하고 README에는 이러한 파일을 사용하는 방법만 설명해야 합니다.

아래는 README 파일에 올릴 수 있는 일반적인 형태의 가이드입니다:

markdown
코드 복사
## Environment Variables

이 프로젝트는 몇 가지 중요한 환경 변수를 필요로 합니다. 아래와 같이 `.env` 파일을 생성하고 필요한 값을 설정해주세요.

### 예시 `.env` 파일:
    ```
    CLERK_SECRET_KEY=your_clerk_secret_key 
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in 
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    
    DATABASE_URL="mysql://<db_username>:<db_password>@<db_host>:<db_port>/<db_name>"
    
    WEBHOOK_SECRET=your_webhook_secret
    
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name 
    NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key 
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

     ```

4. **데이터베이스 마이그레이션**:
    ```bash
    npx prisma migrate dev
    ```

5. **개발 서버 실행**:
    ```bash
    npm run dev
    ```

## 이미지 및 기능 설명

### 포스트 추가

Cloudinary를 활용해 이미지를 업로드하고, Prisma를 통해 서버 측에서 데이터를 처리하여 게시물을 추가하는 기능입니다. 사용자가 게시물을 업로드할 때, 서버 요청이 발생하면 버튼 텍스트가 "Sending..."으로 변경되어, 현재 포스트가 등록 중임을 명확하게 시각적으로 표시합니다. 이를 통해 사용자는 요청이 처리되고 있음을 실시간으로 인지할 수 있습니다.
![포스트](https://github.com/user-attachments/assets/e67ded07-9539-43be-b099-e9c6e37db35f)

### 낙관적 업데이트

댓글 작성 시, 서버 응답을 기다리지 않고 댓글이 즉시 UI에 반영되는 기능입니다. 댓글이 등록되는 동안, 사용자의 이름이 "Sending Please Wait…"으로 표시되어 댓글 등록이 진행 중임을 사용자에게 시각적으로 알립니다. 서버에 성공적으로 저장되면 댓글이 그대로 유지되며, 저장이 실패할 경우 댓글이 원래 상태로 롤백됩니다.
![댓글 낙관](https://github.com/user-attachments/assets/8d328c63-26fd-42c4-b706-9123dc8c9077)

### 반응형 UI

데스크탑, 태블릿, 모바일 등 각기 다른 디바이스에 따라 양쪽 사이드바의 레이아웃이 달라지도록 반응형 UI를 구현했습니다. 이를 통해 각 화면 크기에 최적화된 사용자 경험을 제공합니다.
![반응형](https://github.com/user-attachments/assets/5fafa515-c721-4db5-b1ac-0663fe439b10)

## 프로젝트 구조
![프로젝트 다이어그램](https://github.com/user-attachments/assets/8255e51a-4bbc-44dd-b872-8382e9231118)
위 다이어그램은 프로젝트의 전체 구조를 시각적으로 나타내며, 주요 컴포넌트와 데이터베이스 간의 관계를 보여줍니다.

