import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    interpolation: ['{{', '}}'],

})
export class CardComponent implements OnInit {

    changeText(){
      this.btnText = 'text changed';
    }

    changeText2(event: any){
      console.log(event);
      this.title = event.target.value;
    }

    btnText = 'click me';

    btnDisabled = true;

    title = 'My Card Title';
    arr = [1,2,3,4];
    obj = {
        name: 'Ihor',
        age: 32,
    }

    getInfo(){
        return 'This is my age';
    }

    imgUrl = 'https://github.com/Ste1n-git/angular-app/blob/main/first-app-angular/src/assets/turkish-van-2.jpg'

    ngOnInit(): void {
        setTimeout(() => {
            this.imgUrl = 'https://www.catbreedslist.com/uploads/cat-pictures/turkish-van-2.jpg';
            this.btnDisabled = false;
        }, 3000);
    }
}
