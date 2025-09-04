/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                              ROOT APP COMPONENT                             ║
║                        Application Bootstrap & Layout                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Understanding the root application component
- Application-level layout and structure
- Router outlet for dynamic content loading
- Component composition patterns
- Signal-based reactive properties

🎯 KEY CONCEPTS DEMONSTRATED:
- Root component as application entry point
- Layout composition with header, main, footer
- Router integration for SPA navigation
- Standalone component architecture
- Signal-based state management
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 IMPORTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header/header';
import { Footer } from "./shared/ui/footer/footer";

// ═══════════════════════════════════════════════════════════════════════════════
// 🏠 ROOT APPLICATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Root Component
 * 
 * This is the root component of the Angular application:
 * - Entry point for the entire application
 * - Defines the main layout structure
 * - Hosts the router outlet for dynamic content
 * - Coordinates top-level UI components
 * 
 * 🔍 Key responsibilities:
 * - Application shell (header, main content, footer)
 * - Router outlet for page navigation
 * - Global application state (if needed)
 * - Top-level error boundaries
 */
@Component({
  selector: 'app-root', // 🎯 Root selector used in index.html
  standalone: true, // 🎯 Standalone architecture (no NgModule)
  imports: [RouterOutlet, Header, Footer], // 📥 Import required components
  templateUrl: './app.html', // 🎨 External template file
  styleUrl: './app.scss' // 🎨 Component-specific styles
})
export class App {
  
  // ───────────────────────────────────────────────────────────────────────────
  // 🔄 REACTIVE PROPERTIES
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Signal-based Properties
   * 
   * Using signals for reactive data:
   * - Automatic change detection
   * - Better performance than traditional properties
   * - Type-safe reactive programming
   * - Integration with computed signals
   * 
   * 🔍 Why use signals in the root component?
   * - Application-wide reactive state
   * - Better performance for frequently changing data
   * - Consistent reactive patterns across the app
   */
  protected readonly title = signal('signal-store');
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            📚 LEARNING SUMMARY                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║ 🎯 Key Concepts Covered:                                                    ║
║   • Root component as application entry point                               ║
║   • Application shell pattern (header, main, footer)                        ║
║   • Router outlet for dynamic content loading                               ║
║   • Standalone component architecture                                       ║
║   • Signal-based reactive properties                                        ║
║                                                                              ║
║ 🏗️ Architecture Benefits:                                                   ║
║   • Clear separation of layout and content                                  ║
║   • Reusable component composition                                          ║
║   • Centralized routing configuration                                       ║
║   • Consistent application structure                                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
