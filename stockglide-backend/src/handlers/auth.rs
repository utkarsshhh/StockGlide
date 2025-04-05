use axum::{
    extract::State, 
    http::StatusCode, 
    Json, 
    routing::post, 
    Router
};
use sqlx::PgPool;
use validator::Validate;
use serde::Serialize;
use uuid::Uuid;

use crate::models::user::{RegisterRequest, LoginRequest};
use crate::services::auth_service::AuthService;
use crate::errors::ApiError;

#[derive(Serialize)]
pub struct RegisterResponse {
    pub user_id: Uuid,
    pub email: String,
    pub message: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub user_id: Uuid,
    pub email: String,
    pub token: String,
}

// ✅ Define routes function
pub fn routes() -> Router<PgPool> {
    Router::new()
        .route("/register", post(register_handler))
        .route("/login", post(login_handler))
}

// ✅ Register Handler
pub async fn register_handler(
    State(pool): State<PgPool>,
    Json(request): Json<RegisterRequest>
) -> Result<Json<RegisterResponse>, ApiError> {
    // Validate request data
    request.validate()
        .map_err(|e| ApiError::ValidationError(e.to_string()))?;

    // Call AuthService to handle registration
    let user = AuthService::register(&pool, request).await?;

    Ok(Json(RegisterResponse {
        user_id: user.id,
        email: user.email,
        message: "User registered successfully".to_string(),
    }))
}

// ✅ Login Handler
pub async fn login_handler(
    State(pool): State<PgPool>,
    Json(request): Json<LoginRequest>
) -> Result<Json<LoginResponse>, ApiError> {
    // Validate request data
    request.validate()
        .map_err(|e| ApiError::ValidationError(e.to_string()))?;

    // Call AuthService to handle login
    let (user,token) = AuthService::login(&pool, request).await?;

    Ok(Json(LoginResponse {
        user_id: user.id,
        email: user.email,
        token: token,
    }))
}
