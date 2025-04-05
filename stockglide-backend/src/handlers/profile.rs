use axum::Json;
use serde_json::json;

pub async fn get_profile() -> Json<serde_json::Value> {
    Json(json!({ "message": "User profile retrieved successfully" }))
}
