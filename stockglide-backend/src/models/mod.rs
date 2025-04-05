// src/models/mod.rs
pub mod user;
use crate::handlers::auth;

// src/models/user.rs
use serde::{Deserialize, Serialize};
use validator::Validate;  // Import the trait
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Deserialize, Serialize, Validate, FromRow)]  // Use the derive macro
pub struct User {
    pub id: Uuid,
    #[validate(email)]
    pub email: String,
    pub password_hash: String,
    pub name: Option<String>,
}

#[derive(Deserialize, Validate)]  // Use the derive macro
pub struct CreateUserRequest {
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 8))]
    pub password: String,
}