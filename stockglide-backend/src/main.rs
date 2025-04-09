
use axum::{
    routing::{post, get},
    Router,
};
use tower_http::cors::{CorsLayer, Any};
use sqlx::PgPool;
use tracing_subscriber;
mod config;
mod handlers;
mod models;
mod services;
mod errors;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenvy::dotenv().ok();
    let cors = CorsLayer::new()
        .allow_origin(Any) // allow all origins
        .allow_methods(Any) // allow all methods
        .allow_headers(Any); // allow all headers

    // Create database connection pool
    let database_url = std::env::var("DATABASE_URL")?;
    let server_port = std::env::var("SERVER_PORT")?;
    let pool = PgPool::connect(&database_url).await?;

    // Define routes
    let app = Router::new()
        .route("/register", post(handlers::auth::register_handler))
        .route("/api/auth/login", post(handlers::auth::login_handler))
        .route("/profile", get(handlers::profile::get_profile))
        .with_state(pool).layer(cors);

    // Start server
    let msg = format!("Server running on http://localhost:{}",server_port);
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}",server_port)).await?;
    tracing::info!("{}",msg);
    
    axum::serve(listener, app).await?;

    Ok(())
}