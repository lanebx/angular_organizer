import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

interface Day {
  value: moment.Moment;
  active: boolean;
  disable: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  //calendar: Week[]

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    // console.log(now.clone().startOf('month').startOf('week').date);
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')
  }

}
