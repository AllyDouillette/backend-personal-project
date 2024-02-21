```mermaid
erDiagram
    USER {
        string uuid
        string username
        string password
        enum Role
        createdAt datetime
        updatedAt datetime
    }

    ROLE {
        enum title
    }

    PROFILE {
        int id
        string firstName
        string lastName
        string email
        createdAt datetime
        updatedAt datetime
    }

    CATEGORY {
        int id
        string name
        createdAt datetime
        updatedAt datetime
    }

    CARD {
        int id
        string prompt
        string answer
        string hint
        int level
        int repetitions
        createdAt datetime
        updatedAt datetime
    }

    USER ||--|| ROLE: has
    USER ||--|| PROFILE: has
    USER ||--o{ CATEGORY : creates
    CATEGORY ||--|{ CARD : contains
    USER ||--|{ CARD : creates
```
