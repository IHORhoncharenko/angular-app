import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ClearObservable } from "../../abstract/clear-observers.abstract";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent extends ClearObservable implements OnInit {
  public photos = [
    "https://epicentrk.ua/upload/images/rotator/09_2024/acc/bud_season2_2500x500.jpg",
    "https://epicentrk.ua/upload/medialibrary/764/-588337_paint_in_parts_2500x500_btn.jpg",
  ];
  public shouldAutoplay = false;
  public showImg = this.photos[0]; // Використовуйте індекс
  public quant = 0;

  constructor(
    private cd: ChangeDetectorRef, // Додаємо ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {}

  prevSlide = () => {
    if (this.quant > 0) {
      this.quant--;
    } else {
      this.quant = this.photos.length - 1; // Перемикаємось на останнє фото
    }
    this.showImg = this.photos[this.quant];
    this.cd.markForCheck(); // Оповіщаємо Angular про зміни
  };

  nextSlide = () => {
    if (this.quant < this.photos.length - 1) {
      this.quant++;
    } else {
      this.quant = 0; // Перемикаємось на перше фото
    }
    this.showImg = this.photos[this.quant];
    this.cd.markForCheck(); // Оповіщаємо Angular про зміни
  };
}
