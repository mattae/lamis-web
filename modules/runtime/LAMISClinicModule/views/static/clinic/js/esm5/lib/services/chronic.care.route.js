import * as tslib_1 from "tslib";
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ChronicCareService} from './chronic.care.service';
import {ChronicCareEditComponent} from '../components/chronic-care/chronic.care.edit.component';
import {ChronicCareDetailComponent} from '../components/chronic-care/chronic.care.detail.component';

var ChronicCareResolve = /** @class */ (function () {
    function ChronicCareResolve(service) {
        this.service = service;
    }

    ChronicCareResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) {
                return response.ok;
            }), map(function (patient) {
                return patient.body;
            }));
        }
        return of({});
    };
    ChronicCareResolve.ctorParameters = function () {
        return [
            {type: ChronicCareService}
        ];
    };
    ChronicCareResolve = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ChronicCareService])
    ], ChronicCareResolve);
    return ChronicCareResolve;
}());
export {ChronicCareResolve};
var ɵ0 = {
    title: 'Chronic Care Visit',
    breadcrumb: 'CHRONIC CARE VISIT'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Chronic Care Visit',
    breadcrumb: 'CHRONIC CARE VISIT'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'Chronic Care Visit',
    breadcrumb: 'ADD CHRONIC CARE VISIT'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Chronic Care Visit Edit',
    breadcrumb: 'CHRONIC CARE VISIT EDIT'
};
export var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: ChronicCareDetailComponent,
                resolve: {
                    entity: ChronicCareResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: ChronicCareEditComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: ChronicCareEditComponent,
                resolve: {
                    entity: ChronicCareResolve
                },
                data: ɵ3,
            }
        ]
    }
];
export {ɵ0, ɵ1, ɵ2, ɵ3};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLnJvdXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Nocm9uaWMuY2FyZS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFHdEc7SUFDSSw0QkFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFDL0MsQ0FBQztJQUVELG9DQUFPLEdBQVAsVUFBUSxLQUE2QixFQUFFLEtBQTBCO1FBQzdELElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRCxJQUFJLEVBQUUsRUFBRTtZQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNuQyxNQUFNLENBQUMsVUFBQyxRQUFtQyxJQUFLLE9BQUEsUUFBUSxDQUFDLEVBQUUsRUFBWCxDQUFXLENBQUMsRUFDNUQsR0FBRyxDQUFDLFVBQUMsT0FBa0MsSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLEVBQVosQ0FBWSxDQUFDLENBQzVELENBQUM7U0FDTDtRQUNELE9BQU8sRUFBRSxDQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7O2dCQVo0QixrQkFBa0I7O0lBRHRDLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7aURBRW9CLGtCQUFrQjtPQUR0QyxrQkFBa0IsQ0FjOUI7SUFBRCx5QkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLGtCQUFrQjtTQW1CakI7SUFDRixLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFVBQVUsRUFBRSxvQkFBb0I7Q0FDbkMsT0FRYTtJQUNGLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQixLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFVBQVUsRUFBRSxvQkFBb0I7Q0FDbkMsT0FNSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFVBQVUsRUFBRSx3QkFBd0I7Q0FDdkMsT0FTSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUseUJBQXlCO0lBQ2hDLFVBQVUsRUFBRSx5QkFBeUI7Q0FDeEM7QUF6Q2pCLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBVztJQUMxQjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxJQUdIO1FBQ0QsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsU0FBUyxFQUFFLDBCQUEwQjtnQkFDckMsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxrQkFBa0I7aUJBQzdCO2dCQUNELElBQUksSUFJSDthQUVKO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsU0FBUyxFQUFFLHdCQUF3QjtnQkFDbkMsSUFBSSxJQUlIO2FBRUo7WUFDRDtnQkFDSSxJQUFJLEVBQUUsNkJBQTZCO2dCQUNuQyxTQUFTLEVBQUUsd0JBQXdCO2dCQUNuQyxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGtCQUFrQjtpQkFDN0I7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJlc29sdmUsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZSB9IGZyb20gJy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZVNlcnZpY2UgfSBmcm9tICcuL2Nocm9uaWMuY2FyZS5zZXJ2aWNlJztcbmltcG9ydCB7IENocm9uaWNDYXJlRWRpdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hyb25pYy1jYXJlL2Nocm9uaWMuY2FyZS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZURldGFpbENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hyb25pYy1jYXJlL2Nocm9uaWMuY2FyZS5kZXRhaWwuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENocm9uaWNDYXJlUmVzb2x2ZSBpbXBsZW1lbnRzIFJlc29sdmU8Q2hyb25pY0NhcmU+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IENocm9uaWNDYXJlU2VydmljZSkge1xuICAgIH1cblxuICAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxDaHJvbmljQ2FyZT4ge1xuICAgICAgICBjb25zdCBpZCA9IHJvdXRlLnBhcmFtc1snaWQnXSA/IHJvdXRlLnBhcmFtc1snaWQnXSA6IG51bGw7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kQnlVdWlkKGlkKS5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxDaHJvbmljQ2FyZT4pID0+IHJlc3BvbnNlLm9rKSxcbiAgICAgICAgICAgICAgICBtYXAoKHBhdGllbnQ6IEh0dHBSZXNwb25zZTxDaHJvbmljQ2FyZT4pID0+IHBhdGllbnQuYm9keSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKDxDaHJvbmljQ2FyZT57fSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUk9VVEVTOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6ICdDaHJvbmljIENhcmUgVmlzaXQnLFxuICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0NIUk9OSUMgQ0FSRSBWSVNJVCdcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnOmlkL3BhdGllbnQvOnBhdGllbnRJZC92aWV3JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENocm9uaWNDYXJlRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBDaHJvbmljQ2FyZVJlc29sdmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9VU0VSJ10sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2hyb25pYyBDYXJlIFZpc2l0JyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0NIUk9OSUMgQ0FSRSBWSVNJVCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAncGF0aWVudC86cGF0aWVudElkL25ldycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDaHJvbmljQ2FyZUVkaXRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Nocm9uaWMgQ2FyZSBWaXNpdCcsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdBREQgQ0hST05JQyBDQVJFIFZJU0lUJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvcGF0aWVudC86cGF0aWVudElkL2VkaXQnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ2hyb25pY0NhcmVFZGl0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBDaHJvbmljQ2FyZVJlc29sdmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9ERUMnXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDaHJvbmljIENhcmUgVmlzaXQgRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdDSFJPTklDIENBUkUgVklTSVQgRURJVCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXTtcblxuIl19
