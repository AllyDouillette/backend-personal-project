```mermaid
erDiagram
    USER {
        string uuid
        string username
        string password
        enum Role
        datetime createdAt
        datetime updatedAt
    }

    ROLE {
        enum title
    }

    PROFILE {
        int id
        string firstName
        string lastName
        string email
        datetime createdAt
        datetime updatedAt
    }

    CATEGORY {
        int id
        string name
        datetime createdAt
        datetime updatedAt
    }

    CARD {
        int id
        string prompt
        string answer
        string hint
        int level
        int repetitions
        datetime lastAskedAt
        datetime createdAt
        datetime updatedAt
    }

    USER ||--|| ROLE: has
    USER ||--|| PROFILE: has
    USER ||--o{ CATEGORY : creates
    CATEGORY ||--|{ CARD : contains
    USER ||--|{ CARD : creates
```
