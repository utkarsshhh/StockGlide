use thiserror::Error;
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response}
};

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Authentication failed")]
    AuthenticationError,

    #[error("Database error: {0}")]
    DatabaseError(#[from] sqlx::Error),

    #[error("Validation error: {0}")]
    ValidationError(String),

    #[error("Internal server error")]
    InternalServerError,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        match self {
            ApiError::AuthenticationError => 
                (StatusCode::UNAUTHORIZED, "Authentication failed").into_response(),
            ApiError::DatabaseError(_) => 
                (StatusCode::INTERNAL_SERVER_ERROR, "Database error").into_response(),
            ApiError::ValidationError(msg) => 
                (StatusCode::BAD_REQUEST, msg).into_response(),
            ApiError::InternalServerError => 
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error").into_response(),
        }
    }
}
impl From<anyhow::Error> for ApiError {
    fn from(err: anyhow::Error) -> Self {
        ApiError::InternalServerError
    }
}