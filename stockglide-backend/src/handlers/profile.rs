use axum::{extract::{State,Path} ,Json };
use axum::response::IntoResponse;
use serde_json::json;
use crate::services::auth_service::AuthService;
use sqlx::{PgPool, Postgres, Pool};
use crate::models::user::{User};
use anyhow::Error;
use uuid::Uuid;
use axum::http::StatusCode;

pub async fn profile_handler(State(pool): State<Pool<Postgres>>,Path(user_id): Path<Uuid>) -> impl IntoResponse {
    match AuthService::get_profile(&pool, user_id).await {
        Ok(user) => Ok(Json(user)),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Error fetching profile: {}", e),
        )),
    }
}


