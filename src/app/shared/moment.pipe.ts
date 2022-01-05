import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {
  transform(date: moment.Moment, format: string = "MMMM YYYY"): string {
    return date.format(format)
  }
}
