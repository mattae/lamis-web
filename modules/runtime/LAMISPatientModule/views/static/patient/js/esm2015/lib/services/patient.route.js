import * as tslib_1 from "tslib";
import {Injectable} from '@angular/core';
import {PagingParamsResolve} from '@lamis/web-core';
import {of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PatientService} from './patient.service';
import {PatientDetailsComponent} from '../components/patient-details.component';
import {PatientEditComponent} from '../components/patient-edit.component';
import {PatientListComponent} from '../components/patient-list.component';
import {DetailedTimelineComponent} from '../components/detailed.timeline.component';

let PatientResolve = class PatientResolve {
    constructor(service) {
        this.service = service;
    }

    resolve(route, state) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter((response) => response.ok), map((patient) => patient.body));
        }
        return of({});
    }
};
PatientResolve.ctorParameters = () => [
    {type: PatientService}
];
PatientResolve = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [PatientService])
], PatientResolve);
export {PatientResolve};
const ɵ0 = {
    title: 'Patients',
    breadcrumb: 'PATIENTS'
}, ɵ1 = {}, ɵ2 = {
    authorities: ['ROLE_USER'],
    title: 'Patient Details',
    breadcrumb: 'PATIENT DETAILS'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Add Patient',
    breadcrumb: 'ADD PATIENT'
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'Patient Edit',
    breadcrumb: 'PATIENT EDIT'
}, ɵ5 = {
    authorities: ['ROLE_DEC'],
    title: 'Patient Timeline',
    breadcrumb: 'PATIENT TIMELINE'
};
export const ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: PatientListComponent,
                resolve: {
                    pagingParams: PagingParamsResolve
                },
                data: ɵ1,
            },
            {
                path: ':id/view',
                component: PatientDetailsComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ2,
            },
            {
                path: 'new',
                component: PatientEditComponent,
                data: ɵ3,
            },
            {
                path: ':id/edit',
                component: PatientEditComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ4,
            },
            {
                path: ':id/timeline',
                component: DetailedTimelineComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ5,
            }
        ]
    }
];
export {ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcGF0aWVudC5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsbUJBQW1CLEVBQTBCLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUd0RixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3ZCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQzNDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUM3RCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxFQUFFLEVBQUU7WUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbkMsTUFBTSxDQUFDLENBQUMsUUFBK0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxHQUFHLENBQUMsQ0FBQyxPQUE4QixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3hELENBQUM7U0FDTDtRQUNELE9BQU8sRUFBRSxDQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSixDQUFBOztZQWJnQyxjQUFjOztBQURsQyxjQUFjO0lBRDFCLFVBQVUsRUFBRTs2Q0FFb0IsY0FBYztHQURsQyxjQUFjLENBYzFCO1NBZFksY0FBYztXQW1CYjtJQUNGLEtBQUssRUFBRSxVQUFVO0lBQ2pCLFVBQVUsRUFBRSxVQUFVO0NBQ3pCLE9BUWEsRUFBRSxPQVFGO0lBQ0YsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFCLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsVUFBVSxFQUFFLGlCQUFpQjtDQUNoQyxPQU1LO0lBQ0YsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDO0lBQ3pCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFVBQVUsRUFBRSxhQUFhO0NBQzVCLE9BU0s7SUFDRixXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDekIsS0FBSyxFQUFFLGNBQWM7SUFDckIsVUFBVSxFQUFFLGNBQWM7Q0FDN0IsT0FTSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLFVBQVUsRUFBRSxrQkFBa0I7Q0FDakM7QUE5RGpCLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBVztJQUMxQjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxJQUdIO1FBQ0QsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMLFlBQVksRUFBRSxtQkFBbUI7aUJBQ3BDO2dCQUNELElBQUksSUFBSTthQUNYO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFNBQVMsRUFBRSx1QkFBdUI7Z0JBQ2xDLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7WUFDRDtnQkFDSSxJQUFJLEVBQUUsS0FBSztnQkFDWCxTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixJQUFJLElBSUg7YUFFSjtZQUNEO2dCQUNJLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNELElBQUksSUFJSDthQUVKO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFNBQVMsRUFBRSx5QkFBeUI7Z0JBQ3BDLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJlc29sdmUsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQYWdpbmdQYXJhbXNSZXNvbHZlLCBVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9wYXRpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL3BhdGllbnQubW9kZWwnO1xuaW1wb3J0IHsgUGF0aWVudERldGFpbHNDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF0aWVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BhdGllbnQtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF0aWVudExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BhdGllbnQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGV0YWlsZWRUaW1lbGluZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGV0YWlsZWQudGltZWxpbmUuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhdGllbnRSZXNvbHZlIGltcGxlbWVudHMgUmVzb2x2ZTxQYXRpZW50PiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBQYXRpZW50U2VydmljZSkge1xuICAgIH1cblxuICAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxQYXRpZW50PiB7XG4gICAgICAgIGNvbnN0IGlkID0gcm91dGUucGFyYW1zWydpZCddID8gcm91dGUucGFyYW1zWydpZCddIDogbnVsbDtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmRCeVV1aWQoaWQpLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPFBhdGllbnQ+KSA9PiByZXNwb25zZS5vayksXG4gICAgICAgICAgICAgICAgbWFwKChwYXRpZW50OiBIdHRwUmVzcG9uc2U8UGF0aWVudD4pID0+IHBhdGllbnQuYm9keSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKDxQYXRpZW50Pnt9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBST1VURVM6IFJvdXRlcyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZTogJ1BhdGllbnRzJyxcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdQQVRJRU5UUydcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFBhdGllbnRMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5nUGFyYW1zOiBQYWdpbmdQYXJhbXNSZXNvbHZlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJzppZC92aWV3JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFBhdGllbnREZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBQYXRpZW50UmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX1VTRVInXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQYXRpZW50IERldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iOiAnUEFUSUVOVCBERVRBSUxTJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICduZXcnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogUGF0aWVudEVkaXRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0FkZCBQYXRpZW50JyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0FERCBQQVRJRU5UJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBQYXRpZW50RWRpdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogUGF0aWVudFJlc29sdmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9ERUMnXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQYXRpZW50IEVkaXQnLFxuICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iOiAnUEFUSUVOVCBFRElUJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvdGltZWxpbmUnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogRGV0YWlsZWRUaW1lbGluZUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogUGF0aWVudFJlc29sdmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9ERUMnXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQYXRpZW50IFRpbWVsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ1BBVElFTlQgVElNRUxJTkUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL2NhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG5cbiJdfQ==
