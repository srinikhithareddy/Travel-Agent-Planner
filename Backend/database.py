"""
Database module for SQLite persistence
Handles trip history storage and retrieval
"""

import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Optional
import os


class Database:
    def __init__(self, db_path: str = "travel_planner.db"):
        """Initialize database connection"""
        self.db_path = db_path
        self.init_db()
    
    def get_connection(self):
        """Get database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def init_db(self):
        """Initialize database tables"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # Create trips table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                from_city TEXT NOT NULL,
                destination TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                budget INTEGER NOT NULL,
                travelers INTEGER NOT NULL,
                travel_style TEXT,
                accommodation TEXT,
                food_preference TEXT,
                preferences TEXT,
                trip_plan TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        conn.close()
    
    def save_trip(self, request: Dict, trip_plan: Dict) -> int:
        """Save a trip to the database"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO trips (
                from_city, destination, start_date, end_date, budget,
                travelers, travel_style, accommodation, food_preference,
                preferences, trip_plan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            request.from_city,
            request.destination,
            request.start_date,
            request.end_date,
            request.budget,
            request.travelers,
            request.travel_style,
            request.accommodation,
            request.food_preference,
            request.preferences,
            json.dumps(trip_plan)
        ))
        
        trip_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return trip_id
    
    def get_trip(self, trip_id: int) -> Optional[Dict]:
        """Get a specific trip by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM trips WHERE id = ?", (trip_id,))
        row = cursor.fetchone()
        
        conn.close()
        
        if row:
            return dict(row)
        return None
    
    def get_all_trips(self) -> List[Dict]:
        """Get all trips from database"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM trips ORDER BY created_at DESC")
        rows = cursor.fetchall()
        
        conn.close()
        
        return [dict(row) for row in rows]
    
    def delete_trip(self, trip_id: int) -> bool:
        """Delete a trip by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
        affected = cursor.rowcount
        
        conn.commit()
        conn.close()
        
        return affected > 0
    
    def get_recent_trips(self, limit: int = 10) -> List[Dict]:
        """Get recent trips"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM trips 
            ORDER BY created_at DESC 
            LIMIT ?
        """, (limit,))
        
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(row) for row in rows]


# Global database instance
db = Database()
