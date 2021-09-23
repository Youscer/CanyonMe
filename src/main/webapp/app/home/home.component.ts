import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ISlide } from './carousel/carousel.model';
//
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  slides: ISlide[] = [
    {
      image: 'https://i.ibb.co/J2TTDcV/canyoning-5.jpg',
      title: 'Lorem ipsum',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id ratione illo incidunt similique sed non minima dolorum commodi odit.',
    },
    {
      image: 'https://i.ibb.co/KxkcQtB/canyoning-4.jpg',
      title: 'Lorem ipsum',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id ratione illo incidunt similique sed non minima dolorum commodi odit.',
    },
    {
      image: 'https://i.ibb.co/qdmc86n/canyoning-3.jpg',
      title: 'Lorem ipsum',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id ratione illo incidunt similique sed non minima dolorum commodi odit.',
    },
    {
      image: 'https://i.ibb.co/NSFBP3N/canyoning-2.jpg',

      title: 'Lorem ipsum',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id ratione illo incidunt similique sed non minima dolorum commodi odit.',
    },
    {
      image: 'https://i.ibb.co/V3kCqHP/canyoning-1.jpg',
      title: 'Lorem ipsum',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id ratione illo incidunt similique sed non minima dolorum commodi odit.',
    },
  ];

  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
