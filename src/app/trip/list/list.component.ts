import { Component, OnInit, Input } from '@angular/core';
import { TripList } from '../trip.modal';
import { TripRemove } from 'src/app/common/trip-remove/trip-remove.modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() tripItem: TripList;
  @Input() userId: number;
  tripRemove: TripRemove;
  constructor() { }

  ngOnInit() {
    this.tripRemove = {
      trip_id: this.tripItem.trip_id,
      user_id: this.userId
    }
  }


}
