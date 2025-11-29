##  실행 방법

###  환경 설정

1.  **Node.js 및 npm 설치**를 확인합니다.
2.  프로젝트 폴더로 이동하여 필요한 Express 모듈을 설치합니다.
    ```bash
    npm install express
    ```

### 서버 시작 및 접속

1.  Node.js를 사용하여 서버 파일을 실행합니다.
    ```bash
    node test.js
    ```
2.  서버가 다음 주소와 포트에서 실행됩니다.
    * **접속 주소:** `http://113.198.66.68:13057/`

---

## 구현된 API 엔드포인트 목록

### 데이터 생성 (POST)

| 메소드 | 경로 | 기능 | 성공 응답 | 실패 응답 |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/posts` | 새 게시글 생성 | **201 Created** | 400 Bad Request |
| **POST** | `/users` | 새 사용자 등록 | **201 Created** | 400 Bad Request |

#### 요청 및 응답 예시 (`POST /posts`)

| 구분 | 내용 |
| :--- | :--- |
| **요청 Body** | \`\`\`json {"title": "first", "content": "hi"} \`\`\` |
| **응답 Body** | \`\`\`json {"status": "success", "message": "201 Created", "data": {"number": 1, "title": "first", "content": "hi", "created_at": "..."}} \`\`\` |

### 데이터 조회 (GET)

| 메소드 | 경로 | 기능 | 성공 응답 | 실패/오류 응답 |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/posts` | 전체 게시글 목록 조회 | **200 OK** | |
| **GET** | `/users/:id` | 특정 사용자 상세 조회 | **200 OK** | 404 Not Found, **500 Internal Server Error** |

#### 응답 예시 (`GET /users/:id` - 성공 및 오류)

* **성공 (200 OK):**
    \`\`\`json
    {
        "status": "success",
        "message": "200 OK",
        "data": {
            "id": 1,
            "username": "kim",
            "email": "kim@naver.com"
        }
    }
    \`\`\`
* **오류 (500 Internal Server Error - ID=0):**
    \`\`\`json
    {
        "status": "error",
        "message": "500 Internal Server Error"
    }
    \`\`\`

### 데이터 수정 (PUT)

| 메소드 | 경로 | 기능 | 성공 응답 | 실패/오류 응답 |
| :--- | :--- | :--- | :--- | :--- |
| **PUT** | `/posts/:number` | 특정 게시글 제목/내용 수정 | **200 OK** | 400 Bad Request, 404 Not Found |
| **PUT** | `/users/:id` | 특정 사용자 이메일 수정 | **200 OK** | 400 Bad Request, 404 Not Found, **500 Internal Server Error** |

#### 📝 요청 및 응답 예시 (`PUT /users/:id`)

| 구분 | 내용 |
| :--- | :--- |
| **요청 Body** | \`\`\`json {"new_email": "newmail@asdf.com"} \`\`\` |
| **응답 Body** | \`\`\`json {"status": "success", "message": "200 OK", "data": {"id": 1, "username": "kim", "email": "newmail@asdf.com"}} \`\`\` |

### 데이터 삭제 (DELETE)

| 메소드 | 경로 | 기능 | 성공 응답 | 실패/오류 응답 |
| :--- | :--- | :--- | :--- | :--- |
| **DELETE** | `/posts/:number` | 특정 게시글 삭제 | **204 No Content** | 404 Not Found |
| **DELETE** | `/users/:id` | 특정 사용자 계정 삭제 | **204 No Content** | 404 Not Found, **500 Internal Server Error** |

---
