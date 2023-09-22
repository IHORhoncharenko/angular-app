import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  imports: [HomeComponent, RouterModule],
  standalone: true,
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="../assets/logo-nav@2x.png"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
})
export class AppComponent {
  title = 'homes';
}
