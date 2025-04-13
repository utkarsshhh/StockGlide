use dotenvy;
use std::env;

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub database_url: String,
    pub jwt_secret: String,
    pub server_port: u16,
}

impl AppConfig {
    pub fn load() -> Result<Self, dotenvy::Error> {
        // Load .env file
        dotenvy::dotenv().ok();

        Ok(Self {
            database_url: env::var("DATABASE_URL")
                .expect("DATABASE_URL must be set"),
            jwt_secret: env::var("JWT_SECRET")
                .expect("JWT_SECRET must be set"),
            server_port: env::var("SERVER_PORT")
                .map(|port| port.parse().unwrap_or(3000))
                .unwrap_or(3000),
        })
    }
}