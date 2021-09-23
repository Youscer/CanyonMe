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
      title: 'What is Canyoning ?',
      description:
        'Canyoning is a sporting activity in the great outdoors, aquatic and fun. It consists of progressing on foot in the bed of a river, in gorges or narrow ravines.',
    },
    {
      image: 'https://i.ibb.co/V3kCqHP/canyoning-1.jpg',
      title: 'Canyoning, for who ?',
      description:
        'Canyoning is open to everyone, for half a day, a day, a weekend or a stay. You just have to adapt the route',
    },
    {
      image: 'https://i.ibb.co/NSFBP3N/canyoning-2.jpg',
      title: 'With this in mind, we need canyoning equipment',
      description:
        "Since we are operating in cool water, wearing a neoprene suit is necessary for swimming to be pleasant. In addition, the safety rules require you to have equipment specific to the activity, we find, among other things, the helmet, the harness and the semi-static rope.",
    },
    {
      image: 'https://i.ibb.co/qdmc86n/canyoning-3.jpg',
      title: 'What is Canyoning ?',
      description:
        'Canyoning is a sporting activity in the great outdoors, aquatic and fun. It consists of progressing on foot in the bed of a river, in gorges or narrow ravines.',
    },
    {
      image: 'https://i.ibb.co/KxkcQtB/canyoning-4.jpg',
      title: 'Canyoning, for who ?',
      description:
        'Canyoning is open to everyone, for half a day, a day, a weekend or a stay. You just have to adapt the route',
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
