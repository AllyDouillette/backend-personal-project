```mermaid
erDiagram
    USER {
        string uuid
        string email
        string password
        createdAt datetime
        updatedAt datetime
    }

    CATEGORY {
        int id
        string title
        Cards Card[]
        createdAt datetime
        updatedAt datetime
    }

    CARD {
        int id
        string  UserUUID
        User  User
        int CategoryId
        Category Category
        string prompt
        string answer
        string hint
        int level
        int repetitions
        createdAt datetime
        updatedAt datetime
    }

    USER ||--o{ CATEGORY : creates
    CATEGORY ||--|{ CARD : contains
    USER ||--|{ CARD : creates
```
