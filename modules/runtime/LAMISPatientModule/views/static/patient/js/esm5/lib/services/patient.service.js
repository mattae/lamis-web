import * as tslib_1 from "tslib";
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

var moment = moment_;
var PatientService = /** @class */ (function () {
    function PatientService(http, serverUrl, authServerProvider) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.authServerProvider = authServerProvider;
        this.resourceUrl = '';
        this.resourceSearchUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/patients';
        this.resourceSearchUrl = serverUrl.SERVER_API_URL + '/api/_search/patients';
    }

    PatientService_1 = PatientService;
    PatientService.prototype.create = function (patient) {
        var _this = this;
        var copy = this.convertDateFromClient(patient);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PatientService.prototype.update = function (patient) {
        var _this = this;
        var copy = this.convertDateFromClient(patient);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }), share());
    };
    PatientService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PatientService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PatientService.prototype.query = function (req) {
        var _this = this;
        var options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, {params: options, observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateArrayFromServer(res);
            }));
    };
    PatientService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    PatientService.prototype.widgets = function (patientId) {
        return this.http.get(this.resourceUrl + "/" + patientId + "/widgets", {observe: 'body'});
    };
    PatientService.prototype.observations = function (patientId) {
        return this.http.get(this.resourceUrl + "/" + patientId + "/observations", {
            observe: 'body'
        });
    };
    PatientService.prototype.activities = function (patientId, detailed) {
        return this.http.get(this.resourceUrl + "/" + patientId + "/activities?full=" + detailed, {observe: 'body'})
            .pipe(map(function (res) {
                res.sort(function (t1, t2) {
                    var d1 = moment(t1.date, 'DD MMM, YYYY');
                    var d2 = moment(t2.date, 'DD MMM, YYYY');
                    return d2.diff(d1);
                });
                return res;
            }));
    };
    PatientService.prototype.getActiveFacility = function () {
        return this.http.get('/api/facilities/active');
    };
    PatientService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    PatientService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    PatientService.prototype.getStateByLga = function (id) {
        return this.http.get("/api/provinces/" + id + "/state");
    };
    PatientService.prototype.getFacility = function (id) {
        return this.http.get("/api/facilities/" + id);
    };
    PatientService.prototype.existsByHospitalNumber = function (hospitalNum) {
        return this.http.get(this.resourceUrl + "/exists/hospital-number/" + hospitalNum)
            .pipe(map((function (res) {
                return res ? {'numberExists': true} : null;
            })));
    };
    PatientService.prototype.getStatusDatesByPatient = function (patientId) {
        return this.http.get("/api/client-statuses/patient/" + patientId + "/status-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    PatientService.prototype.getSummaryForPatient = function (id) {
        return this.http.get(this.resourceUrl + "/" + id + "/summary");
    };
    PatientService.prototype.saveClientStatus = function (status) {
        console.log('Status', status);
        var copy = PatientService_1.convertStatusFromClient(status);
        console.log('Copy', copy);
        return this.http.post('/api/client-statuses', copy, {observe: 'response'});
    };
    PatientService.prototype.updateClientStatus = function (status) {
        var copy = PatientService_1.convertStatusFromClient(status);
        return this.http.put('/api/client-statuses', copy, {observe: 'response'});
    };
    PatientService.prototype.findClientStatus = function (id) {
        return this.http.get("/api/client-statuses/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
                res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
                res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
                return res;
            }));
    };
    PatientService.prototype.currentClientStatus = function (patientId) {
        return this.http.get("/api/client-statuses/patient/" + patientId + "/current", {responseType: 'text'});
    };
    PatientService.prototype.getStatusName = function (id) {
        return this.http.get("/api/client-statuses/" + id + "/name", {responseType: 'text'});
    };
    PatientService.convertStatusFromClient = function (status) {
        var copy = Object.assign({}, status, {
            dateStatus: status.dateStatus != null && status.dateStatus.isValid() ? status.dateStatus.format(DATE_FORMAT) : null,
            agreedDate: status.agreedDate != null && status.agreedDate.isValid() ? status.agreedDate.format(DATE_FORMAT) : null,
            dateTracked: status.dateTracked != null && status.dateTracked.isValid() ? status.dateTracked.format(DATE_FORMAT) : null,
        });
        return copy;
    };
    PatientService.prototype.convertDateFromClient = function (patient) {
        var copy = Object.assign({}, patient, {
            dob: patient.dateBirth != null && patient.dateBirth.isValid() ? patient.dateBirth.format(DATE_FORMAT) : null,
            dateRegistration: patient.dateRegistration != null && patient.dateRegistration.isValid() ? patient.dateRegistration.format(DATE_FORMAT) : null,
            dateStarted: patient.dateStarted != null && patient.dateStarted.isValid() ? patient.dateStarted.format(DATE_FORMAT) : null,
            dateConfirmedHiv: patient.dateConfirmedHiv != null && patient.dateConfirmedHiv.isValid() ? patient.dateConfirmedHiv.format(DATE_FORMAT) : null,
            dateEnrolledPMTCT: patient.dateEnrolledPMTCT != null && patient.dateEnrolledPMTCT.isValid() ? patient.dateEnrolledPMTCT.format(DATE_FORMAT) : null,
            pregnant: patient.pregnancyStatus === 2,
            breastfeeding: patient.pregnancyStatus === 3
        });
        return copy;
    };
    PatientService.prototype.convertDateFromServer = function (res) {
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
    };
    PatientService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (patient) {
                patient.name = patient.surname + ', ' + patient.otherNames;
                patient.dateBirth = patient.dateBirth != null ? moment(patient.dateBirth) : null;
                patient.dateRegistration = patient.dateRegistration != null ? moment(patient.dateRegistration) : null;
                patient.dateStarted = patient.dateStarted != null ? moment(patient.dateStarted) : null;
            });
        }
        return res;
    };
    var PatientService_1;
    PatientService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]},
            {type: AuthServerProvider}
        ];
    };
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
    return PatientService;
}());
export {PatientService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjIuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUNILGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzVDLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7O0FBTWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQW9DdkI7SUFJSSx3QkFBc0IsSUFBZ0IsRUFBeUMsU0FBNkIsRUFDeEYsa0JBQXNDO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFDeEYsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUpuRCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFJMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQztJQUNoRixDQUFDO3VCQVJRLGNBQWM7SUFVdkIsK0JBQU0sR0FBTixVQUFPLE9BQWdCO1FBQXZCLGlCQUtDO1FBSkcsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxJQUFJLENBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQXVCLElBQUssT0FBQSxLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sT0FBZ0I7UUFBdkIsaUJBTUM7UUFMRyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBVSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxFQUNuRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssRUFBTztRQUFaLGlCQUlDO1FBSEcsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBYSxJQUFJLENBQUMsV0FBVyxTQUFJLEVBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxFQUFPO1FBQWxCLGlCQUlDO1FBSEcsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBYSxJQUFJLENBQUMsV0FBVyxpQkFBWSxFQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQXVCLElBQUssT0FBQSxLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sR0FBUztRQUFmLGlCQUtDO1FBSkcsSUFBTSxPQUFPLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBWSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQTRCLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sRUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVMsSUFBSSxDQUFDLFdBQVcsU0FBSSxFQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLFNBQWlCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXFCLElBQUksQ0FBQyxXQUFXLFNBQUksU0FBUyxhQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLFNBQWlCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQTBCLElBQUksQ0FBQyxXQUFXLFNBQUksU0FBUyxrQkFBZSxFQUFFO1lBQ3hGLE9BQU8sRUFBRSxNQUFNO1NBQ2xCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsU0FBaUIsRUFBRSxRQUFpQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF1QixJQUFJLENBQUMsV0FBVyxTQUFJLFNBQVMseUJBQW9CLFFBQVUsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQzthQUNySCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztZQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFLEVBQUUsRUFBRTtnQkFDWixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDM0MsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNYLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLHdCQUF3QixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFRLGFBQWEsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsMEJBQXdCLEVBQUksQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQWtCLEVBQUUsV0FBUSxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBbUIsRUFBSSxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELCtDQUFzQixHQUF0QixVQUF1QixXQUFtQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLElBQUksQ0FBQyxXQUFXLGdDQUEyQixXQUFhLENBQUM7YUFDckYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFuQyxDQUFtQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxnREFBdUIsR0FBdkIsVUFBd0IsU0FBaUI7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxrQ0FBZ0MsU0FBUyxrQkFBZSxDQUFDO2FBQ25GLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1lBQ04sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNMLENBQUE7SUFDVCxDQUFDO0lBRUQsNkNBQW9CLEdBQXBCLFVBQXFCLEVBQVU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZSxJQUFJLENBQUMsV0FBVyxTQUFJLEVBQUUsYUFBVSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixNQUFxQjtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFNLElBQUksR0FBRyxnQkFBYyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWdCLHNCQUFzQixFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQzdGLENBQUM7SUFFRCwyQ0FBa0IsR0FBbEIsVUFBbUIsTUFBcUI7UUFDcEMsSUFBTSxJQUFJLEdBQUcsZ0JBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixzQkFBc0IsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtJQUM1RixDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLEVBQUU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixrQ0FBZ0MsRUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDO2FBQzNGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFnQztZQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUYsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3ZGLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2RixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDWCxDQUFDO0lBRUQsNENBQW1CLEdBQW5CLFVBQW9CLFNBQWlCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0NBQWdDLFNBQVMsYUFBVSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUE7SUFDckcsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxFQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMEJBQXdCLEVBQUUsVUFBTyxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUVjLHNDQUF1QixHQUF0QyxVQUF1QyxNQUFxQjtRQUN4RCxJQUFNLElBQUksR0FBa0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQzlDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNuSCxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDbkgsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQzFILENBQ0osQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyw4Q0FBcUIsR0FBL0IsVUFBZ0MsT0FBZ0I7UUFDNUMsSUFBTSxJQUFJLEdBQVksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO1lBQzdDLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM5SSxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDMUgsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDOUksaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDbEosUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLEtBQUssQ0FBQztZQUN2QyxhQUFhLEVBQUUsT0FBTyxDQUFDLGVBQWUsS0FBSyxDQUFDO1NBQy9DLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyw4Q0FBcUIsR0FBL0IsVUFBZ0MsR0FBdUI7UUFDbkQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzlELEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwRixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekcsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3pHLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1RyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUYsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEgsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDckk7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFUyxtREFBMEIsR0FBcEMsVUFBcUMsR0FBNEI7UUFDN0QsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFnQjtnQkFDOUIsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUMzRCxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pGLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEcsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNGLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7OztnQkFyTDJCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjtnQkFDN0Isa0JBQWtCOzs7SUFMakQsY0FBYztRQUQxQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFLWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVSxVQUNFLGtCQUFrQjtPQUxqRCxjQUFjLENBMEwxQjt5QkFqUEQ7Q0FpUEMsQUExTEQsSUEwTEM7U0ExTFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBBdXRoU2VydmVyUHJvdmlkZXIsXG4gICAgY3JlYXRlUmVxdWVzdE9wdGlvbixcbiAgICBEQVRFX0ZPUk1BVCxcbiAgICBTRVJWRVJfQVBJX1VSTF9DT05GSUcsXG4gICAgU2VydmVyQXBpVXJsQ29uZmlnXG59IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGF0aWVudCwgU3RhdHVzSGlzdG9yeSB9IGZyb20gJy4uL21vZGVsL3BhdGllbnQubW9kZWwnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tICcuLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3VtbWFyeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvc3VtbWFyeS53aWRnZXQuY29tcG9uZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxudHlwZSBFbnRpdHlSZXNwb25zZVR5cGUgPSBIdHRwUmVzcG9uc2U8UGF0aWVudD47XG50eXBlIEVudGl0eUFycmF5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPFBhdGllbnRbXT47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aWVudEFjdGl2aXR5IHtcbiAgICB1dWlkPzogc3RyaW5nO1xuICAgIGlkPzogYW55O1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBwYXRoPzogc3RyaW5nO1xuICAgIGVkaXRhYmxlPzogYm9vbGVhbjtcbiAgICB2aWV3YWJsZT86IGJvb2xlYW47XG4gICAgZGVsZXRhYmxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50VGltZWxpbmUge1xuICAgIGRhdGU/OiBzdHJpbmc7XG4gICAgYWN0aXZpdGllcz86IFBhdGllbnRBY3Rpdml0eVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhdGllbnRXaWRnZXQge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgaWNvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50T2JzZXJ2YXRpb24ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcGF0aD86IHN0cmluZztcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIHRvb2x0aXA/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcbiAgICBwdWJsaWMgcmVzb3VyY2VTZWFyY2hVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGhTZXJ2ZXJQcm92aWRlcjogQXV0aFNlcnZlclByb3ZpZGVyKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9wYXRpZW50cyc7XG4gICAgICAgIHRoaXMucmVzb3VyY2VTZWFyY2hVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9fc2VhcmNoL3BhdGllbnRzJztcbiAgICB9XG5cbiAgICBjcmVhdGUocGF0aWVudDogUGF0aWVudCk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChwYXRpZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnBvc3Q8UGF0aWVudD4odGhpcy5yZXNvdXJjZVVybCwgY29weSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShwYXRpZW50OiBQYXRpZW50KTogT2JzZXJ2YWJsZTxFbnRpdHlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgY29uc3QgY29weSA9IHRoaXMuY29udmVydERhdGVGcm9tQ2xpZW50KHBhdGllbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucHV0PFBhdGllbnQ+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpLFxuICAgICAgICAgICAgICAgIHNoYXJlKCkpO1xuICAgIH1cblxuICAgIGZpbmQoaWQ6IGFueSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8UGF0aWVudD4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgZmluZEJ5VXVpZChpZDogYW55KTogT2JzZXJ2YWJsZTxFbnRpdHlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxQYXRpZW50PihgJHt0aGlzLnJlc291cmNlVXJsfS9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIHF1ZXJ5KHJlcT86IGFueSk6IE9ic2VydmFibGU8RW50aXR5QXJyYXlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNyZWF0ZVJlcXVlc3RPcHRpb24ocmVxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxQYXRpZW50W10+KHRoaXMucmVzb3VyY2VVcmwsIHtwYXJhbXM6IG9wdGlvbnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlQXJyYXlGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgd2lkZ2V0cyhwYXRpZW50SWQ6IG51bWJlcik6IE9ic2VydmFibGU8UGF0aWVudFdpZGdldFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnRXaWRnZXRbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRpZW50SWR9L3dpZGdldHNgLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICB9XG5cbiAgICBvYnNlcnZhdGlvbnMocGF0aWVudElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFBhdGllbnRPYnNlcnZhdGlvbltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnRPYnNlcnZhdGlvbltdPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke3BhdGllbnRJZH0vb2JzZXJ2YXRpb25zYCwge1xuICAgICAgICAgICAgb2JzZXJ2ZTogJ2JvZHknXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWN0aXZpdGllcyhwYXRpZW50SWQ6IG51bWJlciwgZGV0YWlsZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFBhdGllbnRUaW1lbGluZVtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnRUaW1lbGluZVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke3BhdGllbnRJZH0vYWN0aXZpdGllcz9mdWxsPSR7ZGV0YWlsZWR9YCwge29ic2VydmU6ICdib2R5J30pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc29ydCgodDEsIHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQxID0gbW9tZW50KHQxLmRhdGUsICdERCBNTU0sIFlZWVknKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZDIgPSBtb21lbnQodDIuZGF0ZSwgJ0REIE1NTSwgWVlZWScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDIuZGlmZihkMSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKVxuICAgIH1cblxuICAgIGdldEFjdGl2ZUZhY2lsaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxGYWNpbGl0eT4oJy9hcGkvZmFjaWxpdGllcy9hY3RpdmUnKVxuICAgIH1cblxuICAgIGdldFN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KCcvYXBpL3N0YXRlcycpXG4gICAgfVxuXG4gICAgZ2V0TGdhc0J5U3RhdGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KGAvYXBpL3Byb3ZpbmNlcy9zdGF0ZS8ke2lkfWApXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVCeUxnYShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgL2FwaS9wcm92aW5jZXMvJHtpZH0vc3RhdGVgKVxuICAgIH1cblxuICAgIGdldEZhY2lsaXR5KGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAvYXBpL2ZhY2lsaXRpZXMvJHtpZH1gKVxuICAgIH1cblxuICAgIGV4aXN0c0J5SG9zcGl0YWxOdW1iZXIoaG9zcGl0YWxOdW06IHN0cmluZyk6IE9ic2VydmFibGU8VmFsaWRhdGlvbkVycm9ycyB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Ym9vbGVhbj4oYCR7dGhpcy5yZXNvdXJjZVVybH0vZXhpc3RzL2hvc3BpdGFsLW51bWJlci8ke2hvc3BpdGFsTnVtfWApXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlcyA9PiByZXMgPyB7J251bWJlckV4aXN0cyc6IHRydWV9IDogbnVsbCkpKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXNEYXRlc0J5UGF0aWVudChwYXRpZW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxNb21lbnRbXT4oYC9hcGkvY2xpZW50LXN0YXR1c2VzL3BhdGllbnQvJHtwYXRpZW50SWR9L3N0YXR1cy1kYXRlc2ApXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChkID0+IG1vbWVudChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICBnZXRTdW1tYXJ5Rm9yUGF0aWVudChpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFN1bW1hcnlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH0vc3VtbWFyeWApXG4gICAgfVxuXG4gICAgc2F2ZUNsaWVudFN0YXR1cyhzdGF0dXM6IFN0YXR1c0hpc3RvcnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBQYXRpZW50U2VydmljZS5jb252ZXJ0U3RhdHVzRnJvbUNsaWVudChzdGF0dXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnQ29weScsIGNvcHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8U3RhdHVzSGlzdG9yeT4oJy9hcGkvY2xpZW50LXN0YXR1c2VzJywgY29weSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgIH1cblxuICAgIHVwZGF0ZUNsaWVudFN0YXR1cyhzdGF0dXM6IFN0YXR1c0hpc3RvcnkpIHtcbiAgICAgICAgY29uc3QgY29weSA9IFBhdGllbnRTZXJ2aWNlLmNvbnZlcnRTdGF0dXNGcm9tQ2xpZW50KHN0YXR1cyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0PFN0YXR1c0hpc3Rvcnk+KCcvYXBpL2NsaWVudC1zdGF0dXNlcycsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG5cbiAgICBmaW5kQ2xpZW50U3RhdHVzKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFN0YXR1c0hpc3Rvcnk+KGAvYXBpL2NsaWVudC1zdGF0dXNlcy9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEh0dHBSZXNwb25zZTxTdGF0dXNIaXN0b3J5PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVUcmFja2VkID0gcmVzLmJvZHkuZGF0ZVRyYWNrZWQgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlVHJhY2tlZCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVTdGF0dXMgPSByZXMuYm9keS5kYXRlU3RhdHVzICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVN0YXR1cykgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmFncmVlZERhdGUgPSByZXMuYm9keS5hZ3JlZWREYXRlICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuYWdyZWVkRGF0ZSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSlcbiAgICB9XG5cbiAgICBjdXJyZW50Q2xpZW50U3RhdHVzKHBhdGllbnRJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAvYXBpL2NsaWVudC1zdGF0dXNlcy9wYXRpZW50LyR7cGF0aWVudElkfS9jdXJyZW50YCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICB9XG5cbiAgICBnZXRTdGF0dXNOYW1lKGlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC9hcGkvY2xpZW50LXN0YXR1c2VzLyR7aWR9L25hbWVgLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNvbnZlcnRTdGF0dXNGcm9tQ2xpZW50KHN0YXR1czogU3RhdHVzSGlzdG9yeSk6IFN0YXR1c0hpc3Rvcnkge1xuICAgICAgICBjb25zdCBjb3B5OiBTdGF0dXNIaXN0b3J5ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdHVzLCB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0YXR1czogc3RhdHVzLmRhdGVTdGF0dXMgIT0gbnVsbCAmJiBzdGF0dXMuZGF0ZVN0YXR1cy5pc1ZhbGlkKCkgPyBzdGF0dXMuZGF0ZVN0YXR1cy5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhZ3JlZWREYXRlOiBzdGF0dXMuYWdyZWVkRGF0ZSAhPSBudWxsICYmIHN0YXR1cy5hZ3JlZWREYXRlLmlzVmFsaWQoKSA/IHN0YXR1cy5hZ3JlZWREYXRlLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgICAgIGRhdGVUcmFja2VkOiBzdGF0dXMuZGF0ZVRyYWNrZWQgIT0gbnVsbCAmJiBzdGF0dXMuZGF0ZVRyYWNrZWQuaXNWYWxpZCgpID8gc3RhdHVzLmRhdGVUcmFja2VkLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVGcm9tQ2xpZW50KHBhdGllbnQ6IFBhdGllbnQpOiBQYXRpZW50IHtcbiAgICAgICAgY29uc3QgY29weTogUGF0aWVudCA9IE9iamVjdC5hc3NpZ24oe30sIHBhdGllbnQsIHtcbiAgICAgICAgICAgIGRvYjogcGF0aWVudC5kYXRlQmlydGggIT0gbnVsbCAmJiBwYXRpZW50LmRhdGVCaXJ0aC5pc1ZhbGlkKCkgPyBwYXRpZW50LmRhdGVCaXJ0aC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgIGRhdGVSZWdpc3RyYXRpb246IHBhdGllbnQuZGF0ZVJlZ2lzdHJhdGlvbiAhPSBudWxsICYmIHBhdGllbnQuZGF0ZVJlZ2lzdHJhdGlvbi5pc1ZhbGlkKCkgPyBwYXRpZW50LmRhdGVSZWdpc3RyYXRpb24uZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlU3RhcnRlZDogcGF0aWVudC5kYXRlU3RhcnRlZCAhPSBudWxsICYmIHBhdGllbnQuZGF0ZVN0YXJ0ZWQuaXNWYWxpZCgpID8gcGF0aWVudC5kYXRlU3RhcnRlZC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgIGRhdGVDb25maXJtZWRIaXY6IHBhdGllbnQuZGF0ZUNvbmZpcm1lZEhpdiAhPSBudWxsICYmIHBhdGllbnQuZGF0ZUNvbmZpcm1lZEhpdi5pc1ZhbGlkKCkgPyBwYXRpZW50LmRhdGVDb25maXJtZWRIaXYuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlRW5yb2xsZWRQTVRDVDogcGF0aWVudC5kYXRlRW5yb2xsZWRQTVRDVCAhPSBudWxsICYmIHBhdGllbnQuZGF0ZUVucm9sbGVkUE1UQ1QuaXNWYWxpZCgpID8gcGF0aWVudC5kYXRlRW5yb2xsZWRQTVRDVC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgIHByZWduYW50OiBwYXRpZW50LnByZWduYW5jeVN0YXR1cyA9PT0gMixcbiAgICAgICAgICAgIGJyZWFzdGZlZWRpbmc6IHBhdGllbnQucHJlZ25hbmN5U3RhdHVzID09PSAzXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVGcm9tU2VydmVyKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKTogRW50aXR5UmVzcG9uc2VUeXBlIHtcbiAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICByZXMuYm9keS5uYW1lID0gcmVzLmJvZHkuc3VybmFtZSArICcsICcgKyByZXMuYm9keS5vdGhlck5hbWVzO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZUJpcnRoID0gcmVzLmJvZHkuZGF0ZUJpcnRoICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZUJpcnRoKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlUmVnaXN0cmF0aW9uID0gcmVzLmJvZHkuZGF0ZVJlZ2lzdHJhdGlvbiAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVSZWdpc3RyYXRpb24pIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVDb25maXJtZWRIaXYgPSByZXMuYm9keS5kYXRlQ29uZmlybWVkSGl2ICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZUNvbmZpcm1lZEhpdikgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZUVucm9sbGVkUE1UQ1QgPSByZXMuYm9keS5kYXRlRW5yb2xsZWRQTVRDVCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVFbnJvbGxlZFBNVENUKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlU3RhcnRlZCA9IHJlcy5ib2R5LmRhdGVTdGFydGVkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVN0YXJ0ZWQpIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LnByZWduYW5jeVN0YXR1cyA9IHJlcy5ib2R5LnByZWduYW50ICE9IG51bGwgJiYgcmVzLmJvZHkucHJlZ25hbnQgPyAyIDogcmVzLmJvZHkuZ2VuZGVyID09PSAnRkVNQUxFJyA/IDEgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkucHJlZ25hbmN5U3RhdHVzID0gcmVzLmJvZHkuYnJlYXN0ZmVlZGluZyAhPSBudWxsICYmIHJlcy5ib2R5LmJyZWFzdGZlZWRpbmcgPyAzIDogcmVzLmJvZHkuZ2VuZGVyID09PSAnRkVNQUxFJyA/IDEgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlQXJyYXlGcm9tU2VydmVyKHJlczogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUpOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkuZm9yRWFjaCgocGF0aWVudDogUGF0aWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnQubmFtZSA9IHBhdGllbnQuc3VybmFtZSArICcsICcgKyBwYXRpZW50Lm90aGVyTmFtZXM7XG4gICAgICAgICAgICAgICAgcGF0aWVudC5kYXRlQmlydGggPSBwYXRpZW50LmRhdGVCaXJ0aCAhPSBudWxsID8gbW9tZW50KHBhdGllbnQuZGF0ZUJpcnRoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcGF0aWVudC5kYXRlUmVnaXN0cmF0aW9uID0gcGF0aWVudC5kYXRlUmVnaXN0cmF0aW9uICE9IG51bGwgPyBtb21lbnQocGF0aWVudC5kYXRlUmVnaXN0cmF0aW9uKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcGF0aWVudC5kYXRlU3RhcnRlZCA9IHBhdGllbnQuZGF0ZVN0YXJ0ZWQgIT0gbnVsbCA/IG1vbWVudChwYXRpZW50LmRhdGVTdGFydGVkKSA6IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbiJdfQ==
