import * as tslib_1 from "tslib";

var PatientService_1;
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {
    AuthServerProvider,
    createRequestOption,
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    ServerApiUrlConfig
} from '@lamis/web-core';
import {map, share} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

const moment = moment_;
let PatientService = PatientService_1 = class PatientService {
    constructor(http, serverUrl, authServerProvider) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.authServerProvider = authServerProvider;
        this.resourceUrl = '';
        this.resourceSearchUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/patients';
        this.resourceSearchUrl = serverUrl.SERVER_API_URL + '/api/_search/patients';
    }

    create(patient) {
        const copy = this.convertDateFromClient(patient);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(patient) {
        const copy = this.convertDateFromClient(patient);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)), share());
    }

    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, {params: options, observe: 'response'})
            .pipe(map((res) => this.convertDateArrayFromServer(res)));
    }

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    widgets(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/widgets`, {observe: 'body'});
    }

    observations(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/observations`, {
            observe: 'body'
        });
    }

    activities(patientId, detailed) {
        return this.http.get(`${this.resourceUrl}/${patientId}/activities?full=${detailed}`, {observe: 'body'})
            .pipe(map(res => {
                res.sort((t1, t2) => {
                    const d1 = moment(t1.date, 'DD MMM, YYYY');
                    const d2 = moment(t2.date, 'DD MMM, YYYY');
                    return d2.diff(d1);
                });
                return res;
            }));
    }

    getActiveFacility() {
        return this.http.get('/api/facilities/active');
    }

    getStates() {
        return this.http.get('/api/states');
    }

    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }

    getStateByLga(id) {
        return this.http.get(`/api/provinces/${id}/state`);
    }

    getFacility(id) {
        return this.http.get(`/api/facilities/${id}`);
    }

    existsByHospitalNumber(hospitalNum) {
        return this.http.get(`${this.resourceUrl}/exists/hospital-number/${hospitalNum}`)
            .pipe(map((res => res ? {'numberExists': true} : null)));
    }

    getStatusDatesByPatient(patientId) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/status-dates`)
            .pipe(map((res) => {
                res.forEach(d => moment(d));
                return res;
            }));
    }

    getSummaryForPatient(id) {
        return this.http.get(`${this.resourceUrl}/${id}/summary`);
    }

    saveClientStatus(status) {
        console.log('Status', status);
        const copy = PatientService_1.convertStatusFromClient(status);
        console.log('Copy', copy);
        return this.http.post('/api/client-statuses', copy, {observe: 'response'});
    }

    updateClientStatus(status) {
        const copy = PatientService_1.convertStatusFromClient(status);
        return this.http.put('/api/client-statuses', copy, {observe: 'response'});
    }

    findClientStatus(id) {
        return this.http.get(`/api/client-statuses/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => {
                res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
                res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
                res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
                return res;
            }));
    }

    currentClientStatus(patientId) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/current`, {responseType: 'text'});
    }

    getStatusName(id) {
        return this.http.get(`/api/client-statuses/${id}/name`, {responseType: 'text'});
    }

    static convertStatusFromClient(status) {
        const copy = Object.assign({}, status, {
            dateStatus: status.dateStatus != null && status.dateStatus.isValid() ? status.dateStatus.format(DATE_FORMAT) : null,
            agreedDate: status.agreedDate != null && status.agreedDate.isValid() ? status.agreedDate.format(DATE_FORMAT) : null,
            dateTracked: status.dateTracked != null && status.dateTracked.isValid() ? status.dateTracked.format(DATE_FORMAT) : null,
        });
        return copy;
    }

    convertDateFromClient(patient) {
        const copy = Object.assign({}, patient, {
            dob: patient.dateBirth != null && patient.dateBirth.isValid() ? patient.dateBirth.format(DATE_FORMAT) : null,
            dateRegistration: patient.dateRegistration != null && patient.dateRegistration.isValid() ? patient.dateRegistration.format(DATE_FORMAT) : null,
            dateStarted: patient.dateStarted != null && patient.dateStarted.isValid() ? patient.dateStarted.format(DATE_FORMAT) : null,
            dateConfirmedHiv: patient.dateConfirmedHiv != null && patient.dateConfirmedHiv.isValid() ? patient.dateConfirmedHiv.format(DATE_FORMAT) : null,
            dateEnrolledPMTCT: patient.dateEnrolledPMTCT != null && patient.dateEnrolledPMTCT.isValid() ? patient.dateEnrolledPMTCT.format(DATE_FORMAT) : null,
            pregnant: patient.pregnancyStatus === 2,
            breastfeeding: patient.pregnancyStatus === 3
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.name = res.body.surname + ', ' + res.body.otherNames;
            res.body.dateBirth = res.body.dateBirth != null ? moment(res.body.dateBirth) : null;
            res.body.dateRegistration = res.body.dateRegistration != null ? moment(res.body.dateRegistration) : null;
            res.body.dateConfirmedHiv = res.body.dateConfirmedHiv != null ? moment(res.body.dateConfirmedHiv) : null;
            res.body.dateEnrolledPMTCT = res.body.dateEnrolledPMTCT != null ? moment(res.body.dateEnrolledPMTCT) : null;
            res.body.dateStarted = res.body.dateStarted != null ? moment(res.body.dateStarted) : null;
            res.body.pregnancyStatus = res.body.pregnant != null && res.body.pregnant ? 2 : res.body.gender === 'FEMALE' ? 1 : null;
            res.body.pregnancyStatus = res.body.breastfeeding != null && res.body.breastfeeding ? 3 : res.body.gender === 'FEMALE' ? 1 : null;
        }
        return res;
    }

    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((patient) => {
                patient.name = patient.surname + ', ' + patient.otherNames;
                patient.dateBirth = patient.dateBirth != null ? moment(patient.dateBirth) : null;
                patient.dateRegistration = patient.dateRegistration != null ? moment(patient.dateRegistration) : null;
                patient.dateStarted = patient.dateStarted != null ? moment(patient.dateStarted) : null;
            });
        }
        return res;
    }
};
PatientService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]},
    {type: AuthServerProvider}
];
PatientService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function PatientService_Factory() {
        return new PatientService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG), i0.ɵɵinject(i2.AuthServerProvider));
    }, token: PatientService, providedIn: "root"
});
PatientService = PatientService_1 = tslib_1.__decorate([
    Injectable({providedIn: 'root'}),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object, AuthServerProvider])
], PatientService);
export {PatientService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjIuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWhFLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc1QyxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7OztBQU1sQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFvQ3ZCLElBQWEsY0FBYyxzQkFBM0IsTUFBYSxjQUFjO0lBSXZCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCLEVBQ3hGLGtCQUFzQztRQURwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQ3hGLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKbkQsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBSTFCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsdUJBQXVCLENBQUM7SUFDaEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFnQjtRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFD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LENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMzRixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTs7WUF0TCtCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjtZQUM3QixrQkFBa0I7OztBQUxqRCxjQUFjO0lBRDFCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUtZLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOzZDQUExQyxVQUFVLFVBQ0Usa0JBQWtCO0dBTGpELGNBQWMsQ0EwTDFCO1NBMUxZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gICAgQXV0aFNlcnZlclByb3ZpZGVyLFxuICAgIGNyZWF0ZVJlcXVlc3RPcHRpb24sXG4gICAgREFURV9GT1JNQVQsXG4gICAgU0VSVkVSX0FQSV9VUkxfQ09ORklHLFxuICAgIFNlcnZlckFwaVVybENvbmZpZ1xufSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgbWFwLCBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBhdGllbnQsIFN0YXR1c0hpc3RvcnkgfSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSAnLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1bW1hcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3N1bW1hcnkud2lkZ2V0LmNvbXBvbmVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbnR5cGUgRW50aXR5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPFBhdGllbnQ+O1xudHlwZSBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSA9IEh0dHBSZXNwb25zZTxQYXRpZW50W10+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhdGllbnRBY3Rpdml0eSB7XG4gICAgdXVpZD86IHN0cmluZztcbiAgICBpZD86IGFueTtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgcGF0aD86IHN0cmluZztcbiAgICBlZGl0YWJsZT86IGJvb2xlYW47XG4gICAgdmlld2FibGU/OiBib29sZWFuO1xuICAgIGRlbGV0YWJsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aWVudFRpbWVsaW5lIHtcbiAgICBkYXRlPzogc3RyaW5nO1xuICAgIGFjdGl2aXRpZXM/OiBQYXRpZW50QWN0aXZpdHlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50V2lkZ2V0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGNvbXBvbmVudE5hbWU6IHN0cmluZztcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGljb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aWVudE9ic2VydmF0aW9uIHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0b29sdGlwPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBQYXRpZW50U2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG4gICAgcHVibGljIHJlc291cmNlU2VhcmNoVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmVyUHJvdmlkZXI6IEF1dGhTZXJ2ZXJQcm92aWRlcikge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvcGF0aWVudHMnO1xuICAgICAgICB0aGlzLnJlc291cmNlU2VhcmNoVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvX3NlYXJjaC9wYXRpZW50cyc7XG4gICAgfVxuXG4gICAgY3JlYXRlKHBhdGllbnQ6IFBhdGllbnQpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5jb252ZXJ0RGF0ZUZyb21DbGllbnQocGF0aWVudCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wb3N0PFBhdGllbnQ+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGF0aWVudDogUGF0aWVudCk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChwYXRpZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnB1dDxQYXRpZW50Pih0aGlzLnJlc291cmNlVXJsLCBjb3B5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpKTtcbiAgICB9XG5cbiAgICBmaW5kKGlkOiBhbnkpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PFBhdGllbnQ+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGZpbmRCeVV1aWQoaWQ6IGFueSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8UGF0aWVudD4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYnktdXVpZC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBxdWVyeShyZXE/OiBhbnkpOiBPYnNlcnZhYmxlPEVudGl0eUFycmF5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjcmVhdGVSZXF1ZXN0T3B0aW9uKHJlcSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8UGF0aWVudFtdPih0aGlzLnJlc291cmNlVXJsLCB7cGFyYW1zOiBvcHRpb25zLCBvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUFycmF5RnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIHdpZGdldHMocGF0aWVudElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFBhdGllbnRXaWRnZXRbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQYXRpZW50V2lkZ2V0W10+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7cGF0aWVudElkfS93aWRnZXRzYCwge29ic2VydmU6ICdib2R5J30pXG4gICAgfVxuXG4gICAgb2JzZXJ2YXRpb25zKHBhdGllbnRJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxQYXRpZW50T2JzZXJ2YXRpb25bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQYXRpZW50T2JzZXJ2YXRpb25bXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRpZW50SWR9L29ic2VydmF0aW9uc2AsIHtcbiAgICAgICAgICAgIG9ic2VydmU6ICdib2R5J1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFjdGl2aXRpZXMocGF0aWVudElkOiBudW1iZXIsIGRldGFpbGVkOiBib29sZWFuKTogT2JzZXJ2YWJsZTxQYXRpZW50VGltZWxpbmVbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQYXRpZW50VGltZWxpbmVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRpZW50SWR9L2FjdGl2aXRpZXM/ZnVsbD0ke2RldGFpbGVkfWAsIHtvYnNlcnZlOiAnYm9keSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLnNvcnQoKHQxLCB0MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkMSA9IG1vbWVudCh0MS5kYXRlLCAnREQgTU1NLCBZWVlZJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQyID0gbW9tZW50KHQyLmRhdGUsICdERCBNTU0sIFlZWVknKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQyLmRpZmYoZDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSlcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVGYWNpbGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHk+KCcvYXBpL2ZhY2lsaXRpZXMvYWN0aXZlJylcbiAgICB9XG5cbiAgICBnZXRTdGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPignL2FwaS9zdGF0ZXMnKVxuICAgIH1cblxuICAgIGdldExnYXNCeVN0YXRlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgL2FwaS9wcm92aW5jZXMvc3RhdGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGdldFN0YXRlQnlMZ2EoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC9hcGkvcHJvdmluY2VzLyR7aWR9L3N0YXRlYClcbiAgICB9XG5cbiAgICBnZXRGYWNpbGl0eShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgL2FwaS9mYWNpbGl0aWVzLyR7aWR9YClcbiAgICB9XG5cbiAgICBleGlzdHNCeUhvc3BpdGFsTnVtYmVyKGhvc3BpdGFsTnVtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25FcnJvcnMgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGJvb2xlYW4+KGAke3RoaXMucmVzb3VyY2VVcmx9L2V4aXN0cy9ob3NwaXRhbC1udW1iZXIvJHtob3NwaXRhbE51bX1gKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXMgPT4gcmVzID8geydudW1iZXJFeGlzdHMnOiB0cnVlfSA6IG51bGwpKSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzRGF0ZXNCeVBhdGllbnQocGF0aWVudElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TW9tZW50W10+KGAvYXBpL2NsaWVudC1zdGF0dXNlcy9wYXRpZW50LyR7cGF0aWVudElkfS9zdGF0dXMtZGF0ZXNgKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZCA9PiBtb21lbnQoZCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0U3VtbWFyeUZvclBhdGllbnQoaWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTdW1tYXJ5W10+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7aWR9L3N1bW1hcnlgKVxuICAgIH1cblxuICAgIHNhdmVDbGllbnRTdGF0dXMoc3RhdHVzOiBTdGF0dXNIaXN0b3J5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICBjb25zdCBjb3B5ID0gUGF0aWVudFNlcnZpY2UuY29udmVydFN0YXR1c0Zyb21DbGllbnQoc3RhdHVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvcHknLCBjb3B5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFN0YXR1c0hpc3Rvcnk+KCcvYXBpL2NsaWVudC1zdGF0dXNlcycsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG5cbiAgICB1cGRhdGVDbGllbnRTdGF0dXMoc3RhdHVzOiBTdGF0dXNIaXN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBQYXRpZW50U2VydmljZS5jb252ZXJ0U3RhdHVzRnJvbUNsaWVudChzdGF0dXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxTdGF0dXNIaXN0b3J5PignL2FwaS9jbGllbnQtc3RhdHVzZXMnLCBjb3B5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZmluZENsaWVudFN0YXR1cyhpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTdGF0dXNIaXN0b3J5PihgL2FwaS9jbGllbnQtc3RhdHVzZXMvYnktdXVpZC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8U3RhdHVzSGlzdG9yeT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRlVHJhY2tlZCA9IHJlcy5ib2R5LmRhdGVUcmFja2VkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVRyYWNrZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRlU3RhdHVzID0gcmVzLmJvZHkuZGF0ZVN0YXR1cyAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVTdGF0dXMpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5hZ3JlZWREYXRlID0gcmVzLmJvZHkuYWdyZWVkRGF0ZSAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmFncmVlZERhdGUpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgY3VycmVudENsaWVudFN0YXR1cyhwYXRpZW50SWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgL2FwaS9jbGllbnQtc3RhdHVzZXMvcGF0aWVudC8ke3BhdGllbnRJZH0vY3VycmVudGAsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pXG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzTmFtZShpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAvYXBpL2NsaWVudC1zdGF0dXNlcy8ke2lkfS9uYW1lYCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjb252ZXJ0U3RhdHVzRnJvbUNsaWVudChzdGF0dXM6IFN0YXR1c0hpc3RvcnkpOiBTdGF0dXNIaXN0b3J5IHtcbiAgICAgICAgY29uc3QgY29weTogU3RhdHVzSGlzdG9yeSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXR1cywge1xuICAgICAgICAgICAgICAgIGRhdGVTdGF0dXM6IHN0YXR1cy5kYXRlU3RhdHVzICE9IG51bGwgJiYgc3RhdHVzLmRhdGVTdGF0dXMuaXNWYWxpZCgpID8gc3RhdHVzLmRhdGVTdGF0dXMuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWdyZWVkRGF0ZTogc3RhdHVzLmFncmVlZERhdGUgIT0gbnVsbCAmJiBzdGF0dXMuYWdyZWVkRGF0ZS5pc1ZhbGlkKCkgPyBzdGF0dXMuYWdyZWVkRGF0ZS5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBkYXRlVHJhY2tlZDogc3RhdHVzLmRhdGVUcmFja2VkICE9IG51bGwgJiYgc3RhdHVzLmRhdGVUcmFja2VkLmlzVmFsaWQoKSA/IHN0YXR1cy5kYXRlVHJhY2tlZC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbUNsaWVudChwYXRpZW50OiBQYXRpZW50KTogUGF0aWVudCB7XG4gICAgICAgIGNvbnN0IGNvcHk6IFBhdGllbnQgPSBPYmplY3QuYXNzaWduKHt9LCBwYXRpZW50LCB7XG4gICAgICAgICAgICBkb2I6IHBhdGllbnQuZGF0ZUJpcnRoICE9IG51bGwgJiYgcGF0aWVudC5kYXRlQmlydGguaXNWYWxpZCgpID8gcGF0aWVudC5kYXRlQmlydGguZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlUmVnaXN0cmF0aW9uOiBwYXRpZW50LmRhdGVSZWdpc3RyYXRpb24gIT0gbnVsbCAmJiBwYXRpZW50LmRhdGVSZWdpc3RyYXRpb24uaXNWYWxpZCgpID8gcGF0aWVudC5kYXRlUmVnaXN0cmF0aW9uLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZVN0YXJ0ZWQ6IHBhdGllbnQuZGF0ZVN0YXJ0ZWQgIT0gbnVsbCAmJiBwYXRpZW50LmRhdGVTdGFydGVkLmlzVmFsaWQoKSA/IHBhdGllbnQuZGF0ZVN0YXJ0ZWQuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlQ29uZmlybWVkSGl2OiBwYXRpZW50LmRhdGVDb25maXJtZWRIaXYgIT0gbnVsbCAmJiBwYXRpZW50LmRhdGVDb25maXJtZWRIaXYuaXNWYWxpZCgpID8gcGF0aWVudC5kYXRlQ29uZmlybWVkSGl2LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUVucm9sbGVkUE1UQ1Q6IHBhdGllbnQuZGF0ZUVucm9sbGVkUE1UQ1QgIT0gbnVsbCAmJiBwYXRpZW50LmRhdGVFbnJvbGxlZFBNVENULmlzVmFsaWQoKSA/IHBhdGllbnQuZGF0ZUVucm9sbGVkUE1UQ1QuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBwcmVnbmFudDogcGF0aWVudC5wcmVnbmFuY3lTdGF0dXMgPT09IDIsXG4gICAgICAgICAgICBicmVhc3RmZWVkaW5nOiBwYXRpZW50LnByZWduYW5jeVN0YXR1cyA9PT0gM1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSk6IEVudGl0eVJlc3BvbnNlVHlwZSB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkubmFtZSA9IHJlcy5ib2R5LnN1cm5hbWUgKyAnLCAnICsgcmVzLmJvZHkub3RoZXJOYW1lcztcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVCaXJ0aCA9IHJlcy5ib2R5LmRhdGVCaXJ0aCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVCaXJ0aCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVJlZ2lzdHJhdGlvbiA9IHJlcy5ib2R5LmRhdGVSZWdpc3RyYXRpb24gIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlUmVnaXN0cmF0aW9uKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlQ29uZmlybWVkSGl2ID0gcmVzLmJvZHkuZGF0ZUNvbmZpcm1lZEhpdiAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVDb25maXJtZWRIaXYpIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVFbnJvbGxlZFBNVENUID0gcmVzLmJvZHkuZGF0ZUVucm9sbGVkUE1UQ1QgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlRW5yb2xsZWRQTVRDVCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVN0YXJ0ZWQgPSByZXMuYm9keS5kYXRlU3RhcnRlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVTdGFydGVkKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5wcmVnbmFuY3lTdGF0dXMgPSByZXMuYm9keS5wcmVnbmFudCAhPSBudWxsICYmIHJlcy5ib2R5LnByZWduYW50ID8gMiA6IHJlcy5ib2R5LmdlbmRlciA9PT0gJ0ZFTUFMRScgPyAxIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LnByZWduYW5jeVN0YXR1cyA9IHJlcy5ib2R5LmJyZWFzdGZlZWRpbmcgIT0gbnVsbCAmJiByZXMuYm9keS5icmVhc3RmZWVkaW5nID8gMyA6IHJlcy5ib2R5LmdlbmRlciA9PT0gJ0ZFTUFMRScgPyAxIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUFycmF5RnJvbVNlcnZlcihyZXM6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlKTogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5LmZvckVhY2goKHBhdGllbnQ6IFBhdGllbnQpID0+IHtcbiAgICAgICAgICAgICAgICBwYXRpZW50Lm5hbWUgPSBwYXRpZW50LnN1cm5hbWUgKyAnLCAnICsgcGF0aWVudC5vdGhlck5hbWVzO1xuICAgICAgICAgICAgICAgIHBhdGllbnQuZGF0ZUJpcnRoID0gcGF0aWVudC5kYXRlQmlydGggIT0gbnVsbCA/IG1vbWVudChwYXRpZW50LmRhdGVCaXJ0aCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHBhdGllbnQuZGF0ZVJlZ2lzdHJhdGlvbiA9IHBhdGllbnQuZGF0ZVJlZ2lzdHJhdGlvbiAhPSBudWxsID8gbW9tZW50KHBhdGllbnQuZGF0ZVJlZ2lzdHJhdGlvbikgOiBudWxsO1xuICAgICAgICAgICAgICAgIHBhdGllbnQuZGF0ZVN0YXJ0ZWQgPSBwYXRpZW50LmRhdGVTdGFydGVkICE9IG51bGwgPyBtb21lbnQocGF0aWVudC5kYXRlU3RhcnRlZCkgOiBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG4iXX0=
