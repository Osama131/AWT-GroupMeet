// references
// https://github.com/fullcalendar/fullcalendar-examples/tree/main/angular16

import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { HttpClient } from '@angular/common/http';
import {  OnInit } from '@angular/core';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  event = {
    title: '',
    description: '',
    date: '',
    group: ''
  };
  events: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEvents();
  }
  createEvent(): void {
    this.http.post<any>('http://localhost:3001/events', this.event).subscribe(
      (response) => {
        this.events.push(response.event);


      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );
  }


  fetchEvents(): void {
    this.http.get<any>('http://localhost:3001/events').subscribe(
      (response) => {
        console.log(response);
        this.events = response.events;
      },
      (error) => {
        console.error(error);
      }
    );
  }



  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    events: this.events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  // constructor(private changeDetector: ChangeDetectorRef) {
  // }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    if (title) {

      const dropdownOptions = ['Option 1', 'Option 2', 'Option 3']; // Example dropdown options
      const selectedOption = prompt('Please select an option from the dropdown:\n' + dropdownOptions.join('\n'));

      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        option: selectedOption // Add the selected option to the event object

      });
      this.events.push(calendarApi);
      this.createEvent();
    }

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    // this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
