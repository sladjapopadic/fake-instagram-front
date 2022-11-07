import {Component, Input} from '@angular/core';
import {UserDto} from "../../shared/user/dto/user-dto";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() user: UserDto;
  @Input() userImageUrl: string;
}
