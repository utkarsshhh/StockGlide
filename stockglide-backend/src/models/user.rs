use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use validator::Validate;
use sqlx::FromRow;
use uuid::Uuid;
  // Add this import

#[derive(Debug,Serialize, Deserialize, Validate, FromRow)]
pub struct User {
    pub id: Uuid,
    #[validate(email)]
    pub email: String,
    pub password_hash: String,
    pub name: Option<String>,
    #[serde(with = "chrono::serde::ts_seconds_option")]
    pub created_at: Option<DateTime<Utc>>,
    #[serde(with = "chrono::serde::ts_seconds_option")]
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize, Validate, Serialize)]
pub struct RegisterRequest {
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 8, max = 100))]
    pub password: String,
    pub name: Option<String>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct LoginRequest {
    #[validate(email)]
    pub email: String,
    pub password: String,
}