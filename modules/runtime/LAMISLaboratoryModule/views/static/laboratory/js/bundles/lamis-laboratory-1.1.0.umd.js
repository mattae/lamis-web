(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('rxjs/operators'), require('moment'), require('@alfresco/adf-core'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@covalent/core'), require('rxjs'), require('@swimlane/ngx-datatable'), require('@angular/forms'), require('ng2-validation')) :
        typeof define === 'function' && define.amd ? define('lamis-laboratory-1.1.0', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', 'rxjs/operators', 'moment', '@alfresco/adf-core', '@angular/common', '@angular/material', '@angular/router', '@covalent/core', 'rxjs', '@swimlane/ngx-datatable', '@angular/forms', 'ng2-validation'], factory) :
            (global = global || self, factory((global['lamis-laboratory-1'] = global['lamis-laboratory-1'] || {}, global['lamis-laboratory-1']['1'] = global['lamis-laboratory-1']['1'] || {}, global['lamis-laboratory-1']['1']['0'] = {}), global.ng.core, global.ng.common.http, global.webCore, global.rxjs.operators, global.moment_, global.adfCore, global.ng.common, global.ng.material, global.ng.router, global.core$1, global.rxjs, global.ngxDatatable, global.ng.forms, global.ng2Validation));
}(this, function (exports, core, http, webCore, operators, moment_, adfCore, common, material, router, core$1, rxjs, ngxDatatable, forms, ng2Validation) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({__proto__: []} instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
            function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex);
        }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }

            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }

            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = {
            label: 0, sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            }, trys: [], ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
        }), g;

        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }

        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {value: op[1], done: false};
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {value: op[0] ? op[1] : void 0, done: true};
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return {value: o && o[i++], done: !o};
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {error: error};
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
        }, i;

        function verb(n) {
            if (g[n]) i[n] = function (v) {
                return new Promise(function (a, b) {
                    q.push([n, v, a, b]) > 1 || resume(n, v);
                });
            };
        }

        function resume(n, v) {
            try {
                step(g[n](v));
            } catch (e) {
                settle(q[0][3], e);
            }
        }

        function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }

        function fulfill(value) {
            resume("next", value);
        }

        function reject(value) {
            resume("throw", value);
        }

        function settle(f, v) {
            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) {
            throw e;
        }), verb("return"), i[Symbol.iterator] = function () {
            return this;
        }, i;

        function verb(n, f) {
            i[n] = o[n] ? function (v) {
                return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
            } : f;
        }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
        }, i);

        function verb(n) {
            i[n] = o[n] && function (v) {
                return new Promise(function (resolve, reject) {
                    v = o[n](v), settle(resolve, reject, v.done, v.value);
                });
            };
        }

        function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
                resolve({value: v, done: d});
            }, reject);
        }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {value: raw});
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : {default: mod};
    }

    var moment = moment_;
    var LaboratoryService = /** @class */ (function () {
        function LaboratoryService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/laboratories';
        }

        LaboratoryService.prototype.create = function (laboratory) {
            var _this = this;
            var copy = this.convertDateFromClient(laboratory);
            return this.http
                .post(this.resourceUrl, copy, {observe: 'response'})
                .pipe(operators.map(function (res) {
                    return _this.convertDateFromServer(res);
                }));
        };
        LaboratoryService.prototype.update = function (laboratory) {
            var _this = this;
            var copy = this.convertDateFromClient(laboratory);
            return this.http
                .put(this.resourceUrl, copy, {observe: 'response'})
                .pipe(operators.map(function (res) {
                    return _this.convertDateFromServer(res);
                }));
        };
        LaboratoryService.prototype.find = function (id) {
            var _this = this;
            return this.http
                .get(this.resourceUrl + "/" + id, {observe: 'response'})
                .pipe(operators.map(function (res) {
                    return _this.convertDateFromServer(res);
                }));
        };
        LaboratoryService.prototype.findByUuid = function (id) {
            var _this = this;
            return this.http
                .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
                .pipe(operators.map(function (res) {
                    return _this.convertDateFromServer(res);
                }));
        };
        LaboratoryService.prototype.delete = function (id) {
            return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
        };
        LaboratoryService.prototype.getPatient = function (id) {
            return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
                .pipe(operators.map(function (res) {
                    if (res) {
                        res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                    }
                    return res;
                }));
        };
        LaboratoryService.prototype.getVisitDatesByPatient = function (patientId) {
            return this.http.get(this.resourceUrl + "/patient/" + patientId + "/report-dates")
                .pipe(operators.map(function (res) {
                    res.forEach(function (d) {
                        return moment(d);
                    });
                    return res;
                }));
        };
        LaboratoryService.prototype.laboratoryCategories = function () {
            return this.http.get(this.resourceUrl + "/test-categories");
        };
        LaboratoryService.prototype.getLinesByLaboratory = function (laboratoryId) {
            return this.http.get(this.resourceUrl + "/" + laboratoryId + "/lines");
        };
        LaboratoryService.prototype.labTestsByCategory = function (id) {
            return this.http.get(this.resourceUrl + "/lab-tests/category/" + id);
        };
        LaboratoryService.prototype.getLabTestById = function (id) {
            return this.http.get(this.resourceUrl + "/lab-test/" + id);
        };
        LaboratoryService.prototype.latestVisit = function (patientId) {
            return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
        };
        LaboratoryService.prototype.convertDateFromClient = function (laboratory) {
            var copy = Object.assign({}, laboratory, {
                dateReported: laboratory.dateResultReceived != null && laboratory.dateResultReceived.isValid() ? laboratory.dateResultReceived.format(webCore.DATE_FORMAT) : null,
                dateAssay: laboratory.dateAssay != null && laboratory.dateAssay.isValid() ? laboratory.dateAssay.format(webCore.DATE_FORMAT) : null,
                dateSampleCollected: laboratory.dateSampleCollected != null && laboratory.dateSampleCollected.isValid() ? laboratory.dateSampleCollected.format(webCore.DATE_FORMAT) : null
            });
            return copy;
        };
        LaboratoryService.prototype.convertDateFromServer = function (res) {
            if (res.body) {
                res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment(res.body.dateSampleCollected) : null;
                res.body.dateResultReceived = res.body.dateResultReceived != null ? moment(res.body.dateResultReceived) : null;
                res.body.dateAssay = res.body.dateAssay != null ? moment(res.body.dateAssay) : null;
            }
            return res;
        };
        LaboratoryService.prototype.convertDateArrayFromServer = function (res) {
            if (res.body) {
                res.body.forEach(function (laboratory) {
                    laboratory.dateResultReceived = laboratory.dateResultReceived != null ? moment(laboratory.dateResultReceived) : null;
                    laboratory.dateAssay = laboratory.dateAssay != null ? moment(laboratory.dateAssay) : null;
                    laboratory.dateSampleCollected = laboratory.dateSampleCollected != null ? moment(laboratory.dateSampleCollected) : null;
                    1;
                });
            }
            return res;
        };
        LaboratoryService.ctorParameters = function () {
            return [
                {type: http.HttpClient},
                {type: undefined, decorators: [{type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,]}]}
            ];
        };
        LaboratoryService.ngInjectableDef = core.ɵɵdefineInjectable({
            factory: function LaboratoryService_Factory() {
                return new LaboratoryService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG));
            }, token: LaboratoryService, providedIn: "root"
        });
        LaboratoryService = __decorate([
            core.Injectable({providedIn: 'root'}),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], LaboratoryService);
        return LaboratoryService;
    }());

    var LaboratoryDetailsComponent = /** @class */ (function () {
        function LaboratoryDetailsComponent(router, route, laboratoryService, cfr, _dialogService, notificationService, updateService) {
            this.router = router;
            this.route = route;
            this.laboratoryService = laboratoryService;
            this.cfr = cfr;
            this._dialogService = _dialogService;
            this.notificationService = notificationService;
            this.updateService = updateService;
            this.properties = [];
        }

        LaboratoryDetailsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                var patientId = _this.route.snapshot.paramMap.get('patientId');
                _this.laboratoryService.getPatient(patientId).subscribe(function (res) {
                    return _this.entity.patient = res;
                });
                _this.buildProperties();
            });
        };
        LaboratoryDetailsComponent.prototype.edit = function () {
            this.router.navigate(['/', 'laboratories', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
        };
        LaboratoryDetailsComponent.prototype.delete = function () {
            var _this = this;
            this._dialogService.openConfirm({
                title: 'Confirm',
                message: 'Do you want to delete this laboratory request, action cannot be reversed?',
                cancelButton: 'No',
                acceptButton: 'Yes',
                width: '500px',
            }).afterClosed().subscribe(function (accept) {
                if (accept) {
                    _this.laboratoryService.delete(_this.entity.id).subscribe(function (res) {
                        if (res.ok) {
                            _this.router.navigate(['patients']);
                        } else {
                            _this.notificationService.showError('Error deleting visit, please try again');
                        }
                    });
                } else {
                    // DO SOMETHING ELSE
                }
            });
        };
        LaboratoryDetailsComponent.prototype.buildProperties = function () {
            var _this = this;
            this.properties.push(new adfCore.CardViewDateItemModel({
                key: 'sc',
                value: this.entity.dateSampleCollected,
                label: 'Date of Sample Collected',
                format: 'dd MMM, yyyy'
            }));
            this.properties.push(new adfCore.CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateAssay,
                label: 'Date of Assay',
                format: 'dd MMM, yyyy'
            }));
            this.properties.push(new adfCore.CardViewDateItemModel({
                key: 'na',
                value: this.entity.dateResultReceived,
                label: 'Date Result Received',
                format: 'dd MMM, yyyy'
            }));
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'Laboratory Number',
                key: 'fs',
                value: this.entity.labNo
            }));
            this.laboratoryService.getLinesByLaboratory(this.entity.id)
                .subscribe(function (res) {
                    _this.dataSource = res;
                });
        };
        LaboratoryDetailsComponent.prototype.previousState = function () {
            window.history.back();
        };
        LaboratoryDetailsComponent.prototype.ngOnDestroy = function () {
        };
        LaboratoryDetailsComponent.ctorParameters = function () {
            return [
                {type: router.Router},
                {type: router.ActivatedRoute},
                {type: LaboratoryService},
                {type: core.ComponentFactoryResolver},
                {type: core$1.TdDialogService},
                {type: adfCore.NotificationService},
                {type: adfCore.CardViewUpdateService}
            ];
        };
        LaboratoryDetailsComponent = __decorate([
            core.Component({
                selector: 'lamis-laboratory',
                template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"labTest.description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"result\" title=\"Result\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"labTest.measure\" title=\"Unit\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"comment\" title=\"Comment\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
            }),
            __metadata("design:paramtypes", [router.Router, router.ActivatedRoute, LaboratoryService,
                core.ComponentFactoryResolver, core$1.TdDialogService,
                adfCore.NotificationService,
                adfCore.CardViewUpdateService])
        ], LaboratoryDetailsComponent);
        return LaboratoryDetailsComponent;
    }());

    var moment$1 = moment_;
    var LaboratoryEditComponent = /** @class */ (function () {
        function LaboratoryEditComponent(laboratoryService, notification, appLoaderService, _dialogService, activatedRoute) {
            this.laboratoryService = laboratoryService;
            this.notification = notification;
            this.appLoaderService = appLoaderService;
            this._dialogService = _dialogService;
            this.activatedRoute = activatedRoute;
            this.entity = {};
            this.maxNextVisit = moment$1().add(200, 'days');
            this.categories = [];
            this.tests = [];
            this.selectedTests = [];
            this.error = false;
            this.tomorrow = moment$1().add(1, 'days');
            this.today = moment$1();
            this.ColumnMode = ngxDatatable.ColumnMode;
            this.editing = {};
            this.errors = {};
            this.rows = [];
            this.labTestIds = new Set();
            this.visitDates = [];
        }

        LaboratoryEditComponent.prototype.createEntity = function () {
            return {};
        };
        LaboratoryEditComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.isSaving = false;
            this.activatedRoute.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                if (_this.entity === undefined) {
                    _this.entity = _this.createEntity();
                }
                var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
                _this.laboratoryService.getPatient(patientId).subscribe(function (res) {
                    _this.entity.patient = res;
                    _this.patient = res;
                    _this.dateRegistration = res.dateRegistration;
                    _this.entity.facility = res.facility;
                    _this.laboratoryService.getVisitDatesByPatient(res.id).subscribe(function (res) {
                        _this.visitDates = res;
                    });
                    _this.minReportedDate = _this.entity.patient.dateRegistration.clone().add(3, 'days');
                    _this.minAssayDate = _this.entity.patient.dateRegistration.clone().add(2, 'days');
                    if (_this.entity.id) {
                        _this.updateMinDates();
                    }
                });
                if (_this.entity.id) {
                    _this.updateMinDates();
                    _this.laboratoryService.getLinesByLaboratory(_this.entity.id)
                        .subscribe(function (res) {
                            _this.rows = res.map(function (r) {
                                _this.laboratoryService.getLabTestById(r.labTest.id).subscribe(function (res) {
                                    if (!_this.tests.map(function (r) {
                                        return r.id;
                                    }).includes(r.labTest.id)) {
                                        _this.tests.push(res);
                                        _this.selectedTests.push(res);
                                        _this.tests = __spread(_this.tests);
                                        _this.selectedTests = __spread(_this.selectedTests);
                                    }
                                    r.result = r.result || '';
                                });
                                return r;
                            });
                        });
                }
                _this.laboratoryService.laboratoryCategories().subscribe(function (res) {
                    return _this.categories = res;
                });
            });
        };
        LaboratoryEditComponent.prototype.updateMinDates = function () {
            this.minAssayDate = this.entity.dateSampleCollected.clone().add(2, 'days');
            if (this.entity.dateAssay) {
                this.minReportedDate = this.entity.dateAssay.clone().add(2, 'days');
            } else {
                this.minReportedDate = this.entity.dateSampleCollected.clone().add(7, 'days');
            }
        };
        LaboratoryEditComponent.prototype.filterDates = function (date) {
            var exists = false;
            this.visitDates.forEach(function (d) {
                if (date.diff(d, 'days') === 0) {
                    exists = true;
                }
            });
            return (this.entity.id && date.diff(this.entity.dateSampleCollected, 'days') === 0) || !exists;
        };
        LaboratoryEditComponent.prototype.previousState = function () {
            window.history.back();
        };
        LaboratoryEditComponent.prototype.entityCompare = function (e1, e2) {
            return webCore.entityCompare(e1, e2);
        };
        LaboratoryEditComponent.prototype.sampleDateChanged = function (date) {
            this.minAssayDate = date.clone().add(2, 'days');
        };
        LaboratoryEditComponent.prototype.assayDateChanged = function (date) {
            this.minReportedDate = date.clone().add(2, 'days');
        };
        LaboratoryEditComponent.prototype.edit = function (rowIndex) {
            this.editing[rowIndex + ''] = true;
        };
        LaboratoryEditComponent.prototype.save = function () {
            var _this = this;
            this.isSaving = true;
            var abort = false;
            //this.progressBar.mode = 'indeterminate';
            this.rows.forEach(function (line) {
                if (line.labTest.id === 16 && !line.indication) {
                    _this._dialogService.openAlert({
                        title: 'Indication is required',
                        message: 'Please select indication for Viral Load Test',
                        disableClose: true
                    });
                    _this.isSaving = false;
                    abort = true;
                }
                if (line.labTest.id !== 16 && line.indication) {
                    line.indication = null;
                }
                if (_this.entity.dateAssay && !line.result) {
                    _this._dialogService.openAlert({
                        title: 'Result is required',
                        message: 'Please provide test result',
                        disableClose: true
                    });
                    _this.isSaving = false;
                    abort = true;
                }
                var result = parseInt(line.result);
                if ((line.labTest.id === 16 || line.labTest.id === 1) && _this.entity.dateAssay && !result) {
                    _this._dialogService.openAlert({
                        title: 'Result is invalid',
                        message: 'Please provide numeric result for test',
                        disableClose: true
                    });
                    _this.isSaving = false;
                    abort = true;
                } else {
                    line.result = result.toString();
                }
                if (line.result && !_this.entity.dateAssay) {
                    _this.isSaving = false;
                    abort = true;
                    _this._dialogService.openAlert({
                        title: 'Form not complete',
                        message: 'Please provide Date of Test Assay',
                        disableClose: true
                    });
                }
            });
            if (abort) {
                return;
            }
            this.appLoaderService.open('Saving request...');
            this.entity.lines = this.rows;
            if (this.entity.id !== undefined) {
                this.subscribeToSaveResponse(this.laboratoryService.update(this.entity));
            } else {
                this.subscribeToSaveResponse(this.laboratoryService.create(this.entity));
            }
        };
        LaboratoryEditComponent.prototype.categoryChanged = function (type) {
            var _this = this;
            this.laboratoryService.labTestsByCategory(type.id).subscribe(function (res) {
                res.forEach(function (labTest) {
                    if (!_this.tests.map(function (r) {
                        return r.id;
                    }).includes(labTest.id)) {
                        _this.tests.push(labTest);
                        _this.tests = __spread(_this.tests);
                    }
                });
            });
        };
        LaboratoryEditComponent.prototype.testChanged = function (event) {
            var _this = this;
            this.selectedTests.forEach(function (labTest) {
                if (!_this.labTestIds.has(labTest.id)) {
                    _this.rows.push({
                        labTest: labTest
                    });
                    _this.rows = __spread(_this.rows);
                    _this.labTestIds.add(labTest.id);
                }
                _this.rows = _this.rows.filter(function (row) {
                    return _this.selectedTests.map(function (test) {
                        return test.id;
                    }).includes(row.labTest.id);
                });
                _this.labTestIds.forEach(function (id) {
                    if (!_this.rows.map(function (r) {
                        return r.labTest.id;
                    }).includes(id)) {
                        _this.labTestIds.delete(id);
                    }
                });
            });
        };
        LaboratoryEditComponent.prototype.updateValue = function (event, cell, rowIndex) {
            console.log('inline editing rowIndex', rowIndex);
            this.editing[rowIndex + '-' + cell] = false;
            this.rows[rowIndex][cell] = cell === 'indication' ? event : event.target.value;
            this.errors[rowIndex + '-result'] = this.entity.dateAssay && !this.rows[rowIndex][cell];
            this.errors[rowIndex + '-indication'] = this.rows[rowIndex].labTest.id === 16 && !this.rows[rowIndex]['indication'];
            this.rows = __spread(this.rows);
            console.log('UPDATED!', this.rows[rowIndex][cell]);
        };
        LaboratoryEditComponent.prototype.subscribeToSaveResponse = function (result) {
            var _this = this;
            result.subscribe(function (res) {
                return _this.onSaveSuccess(res.body);
            }, function (res) {
                _this.appLoaderService.close();
                _this.onSaveError();
                _this.onError(res.message);
            });
        };
        LaboratoryEditComponent.prototype.onSaveSuccess = function (result) {
            this.appLoaderService.close();
            this.isSaving = false;
            this.notification.showInfo('Laboratory request successfully saved');
            this.previousState();
        };
        LaboratoryEditComponent.prototype.onSaveError = function () {
            this.isSaving = false;
            this.error = true;
            this.notification.showError('Error saving laboratory request');
        };
        LaboratoryEditComponent.prototype.onError = function (errorMessage) {
            this.isSaving = false;
            this.notification.showError(errorMessage);
        };
        LaboratoryEditComponent.ctorParameters = function () {
            return [
                {type: LaboratoryService},
                {type: adfCore.NotificationService},
                {type: webCore.AppLoaderService},
                {type: core$1.TdDialogService},
                {type: router.ActivatedRoute}
            ];
        };
        __decorate([
            core.ViewChild(material.MatProgressBar, {static: true}),
            __metadata("design:type", material.MatProgressBar)
        ], LaboratoryEditComponent.prototype, "progressBar", void 0);
        __decorate([
            core.ViewChild(material.MatButton, {static: true}),
            __metadata("design:type", material.MatButton)
        ], LaboratoryEditComponent.prototype, "submitButton", void 0);
        LaboratoryEditComponent = __decorate([
            core.Component({
                selector: 'lamis-laboratory-edit',
                template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #laboratoryForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content *ngIf=\"patient\">\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity && dateRegistration\">\r\n                            <input matInput [matDatepicker]=\"picker\"\r\n                                   placeholder=\"Date of Sample Collection\"\r\n                                   [(ngModel)]=\"entity.dateSampleCollected\"\r\n                                   #dateCollected=\"ngModel\"\r\n                                   (dateChange)=\"sampleDateChanged($event.value)\"\r\n                                   [max]=\"today\"\r\n                                   [min]=\"dateRegistration\"\r\n                                   required\r\n                                   name=\"dateCollected\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.required)\">\r\n                                Date of Sample Collection is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.min)\">\r\n                                Date of Sample Collection cannot be\r\n                                before {{entity.patient.dateRegistration | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.max)\">\r\n                                Date of Sample Collection cannot be in the future\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [(ngModel)]=\"entity.labNo\"\r\n                                   placeholder=\"Laboratory Number\"\r\n                                   #labNo=\"ngModel\" required name=\"labNo\"/>\r\n                            <mat-error\r\n                                    *ngIf=\"labNo.errors && (labNo.dirty || labNo.touched) && (labNo.errors.required)\">\r\n                                Lab Number is required\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"minAssayDate\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker1\"\r\n                                   placeholder=\"Date Assay\"\r\n                                   [(ngModel)]=\"entity.dateAssay\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   (dateChange)=\"assayDateChanged($event.value)\"\r\n                                   #dateAssay=\"ngModel\"\r\n                                   [min]=\"minAssayDate\"\r\n                                   [max]=\"today\"\r\n                                   name=\"dateAssay\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker1\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.required)\">\r\n                                Date Assay is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.max)\">\r\n                                Date Assay must be after {{today | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.min)\">\r\n                                Date Assay must be after {{minAssayDate}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"minReportedDate\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker2\"\r\n                                   placeholder=\"Date Result Received\"\r\n                                   [(ngModel)]=\"entity.dateResultReceived\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   #dateReported=\"ngModel\"\r\n                                   [min]=\"minReportedDate\"\r\n                                   [max]=\"today\"\r\n                                   [required]=\"!!entity.dateAssay\"\r\n                                   name=\"dateReported\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker2\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker2></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.required)\">\r\n                                Date Result Received is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.max)\">\r\n                                Date Result Received must be after {{today | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.min)\">\r\n                                Date Result Received must not be before {{minReportedDate | date : 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Laboratory Test Category\"\r\n                                            (selectionChange)=\"categoryChanged($event.value)\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let category of categories\"\r\n                                                [value]=\"category\">{{category.category}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Laboratory Test\"\r\n                                            multiple\r\n                                            name=\"regimen\"\r\n                                            [(ngModel)]=\"selectedTests\"\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            (selectionChange)=\"testChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let test of tests\"\r\n                                                [value]=\"test\">{{test.description}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        Selected Test\r\n                        <mat-divider></mat-divider>\r\n                        <ngx-datatable\r\n                            #mydatatable\r\n                            class=\"material full-width\"\r\n                            [headerHeight]=\"50\"\r\n                            [limit]=\"5\"\r\n                            [columnMode]=\"ColumnMode.force\"\r\n                            [footerHeight]=\"50\"\r\n                            rowHeight=\"auto\"\r\n                            [rows]=\"rows\"\r\n                        >\r\n                            <ngx-datatable-column name=\"Test Description\" [prop]=\"'labTest.description'\"\r\n                                                  [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-value=\"value\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Result\" [prop]=\"'result'\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <input matInput [value]=\"value\" disabled>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                name=\"result\"\r\n                                                [required]=\"!!entity.dateAssay\"\r\n                                                (blur)=\"updateValue($event, 'result', rowIndex)\"\r\n                                                [value]=\"value || ''\"\r\n                                        >\r\n                                        <span matSuffix>&nbsp;{{row.labTest.unit}}</span>\r\n                                        <mat-error *ngIf=\"errors[rowIndex + '-result']\">\r\n                                            Result value is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Comment\" [prop]=\"'comment'\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <textarea matInput [value]=\"value\" disabled rows=\"2\"></textarea>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <textarea\r\n                                                autofocus\r\n                                                matInput\r\n                                                rows=\"2\"\r\n                                                (blur)=\"updateValue($event, 'comment', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        ></textarea>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Indication\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <input matInput [value]=\"value\" disabled>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-select autofocus\r\n                                                    [value]=\"value\"\r\n                                                    [required]=\"row.labTest.id === 16\"\r\n                                                    name=\"ind\"\r\n                                                    (valueChange)=\"updateValue($event, 'indication', rowIndex)\">\r\n                                            <mat-option></mat-option>\r\n                                            <mat-option [value]=\"'Routine Monitoring'\">Routine Monitoring</mat-option>\r\n                                            <mat-option [value]=\"'Targeted Monitoring'\">Targeted Monitoring</mat-option>\r\n                                        </mat-select>\r\n                                        <mat-error *ngIf=\"errors[rowIndex + '-indication']\">\r\n                                            Viral Load indication is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <!--<ngx-datatable-column name=\"Action\" prop=\"id\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <button type=\"button\" mat-icon-button\r\n                                            *ngIf=\"!editing[rowIndex + '']\"\r\n                                            (click)=\"edit(rowIndex)\"\r\n                                            (mouseenter)=\"edit(rowIndex)\"\r\n                                            title=\"Click to edit\">\r\n                                        <mat-icon>edit</mat-icon>\r\n                                    </button>\r\n                                    <button type=\"button\" mat-icon-button\r\n                                            *ngIf=\"editing[rowIndex + '']\"\r\n                                            (dblclick)=\"editing[rowIndex + ''] = false\"\r\n                                            title=\"Click to save\">\r\n                                        <mat-icon>save</mat-icon>\r\n                                    </button>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>-->\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"laboratoryForm.invalid || rows.length === 0 || isSaving\"\r\n                            type=\"submit\">\r\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
            }),
            __metadata("design:paramtypes", [LaboratoryService,
                adfCore.NotificationService,
                webCore.AppLoaderService,
                core$1.TdDialogService,
                router.ActivatedRoute])
        ], LaboratoryEditComponent);
        return LaboratoryEditComponent;
    }());

    var LaboratoryResolve = /** @class */ (function () {
        function LaboratoryResolve(service) {
            this.service = service;
        }

        LaboratoryResolve.prototype.resolve = function (route, state) {
            var id = route.params['id'] ? route.params['id'] : null;
            if (id) {
                return this.service.findByUuid(id).pipe(operators.filter(function (response) {
                    return response.ok;
                }), operators.map(function (patient) {
                    return patient.body;
                }));
            }
            return rxjs.of({});
        };
        LaboratoryResolve.ctorParameters = function () {
            return [
                {type: LaboratoryService}
            ];
        };
        LaboratoryResolve = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [LaboratoryService])
        ], LaboratoryResolve);
        return LaboratoryResolve;
    }());
    var ɵ0 = {
        title: 'Laboratory Request',
        breadcrumb: 'LABORATORY REQUEST'
    }, ɵ1 = {
        authorities: ['ROLE_USER'],
        title: 'Laboratory Request',
        breadcrumb: 'LABORATORY REQUEST'
    }, ɵ2 = {
        authorities: ['ROLE_DEC'],
        title: 'LABORATORY REQUEST',
        breadcrumb: 'ADD LABORATORY REQUEST'
    }, ɵ3 = {
        authorities: ['ROLE_DEC'],
        title: 'Laboratory Request Edit',
        breadcrumb: 'LABORATORY REQUEST EDIT'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: ':id/patient/:patientId/view',
                    component: LaboratoryDetailsComponent,
                    resolve: {
                        entity: LaboratoryResolve
                    },
                    data: ɵ1,
                },
                {
                    path: 'patient/:patientId/new',
                    component: LaboratoryEditComponent,
                    data: ɵ2,
                },
                {
                    path: ':id/patient/:patientId/edit',
                    component: LaboratoryEditComponent,
                    resolve: {
                        entity: LaboratoryResolve
                    },
                    data: ɵ3,
                }
            ]
        }
    ];

    var LaboratoryModule = /** @class */ (function () {
        function LaboratoryModule() {
        }

        LaboratoryModule = __decorate([
            core.NgModule({
                declarations: [
                    LaboratoryDetailsComponent,
                    LaboratoryEditComponent
                ],
                imports: [
                    common.CommonModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    router.RouterModule.forChild(ROUTES),
                    material.MatProgressBarModule,
                    forms.FormsModule,
                    core$1.CovalentMessageModule,
                    core$1.CovalentDialogsModule,
                    material.MatTableModule,
                    material.MatListModule,
                    adfCore.CoreModule,
                    ngxDatatable.NgxDatatableModule,
                    forms.ReactiveFormsModule,
                    webCore.MatDateFormatModule,
                    ng2Validation.CustomFormsModule
                ],
                exports: [
                    LaboratoryDetailsComponent,
                    LaboratoryEditComponent
                ],
                entryComponents: [],
                providers: [
                    LaboratoryResolve
                ]
            })
        ], LaboratoryModule);
        return LaboratoryModule;
    }());

    exports.LaboratoryModule = LaboratoryModule;
    exports.LaboratoryService = LaboratoryService;
    exports.ɵa = LaboratoryDetailsComponent;
    exports.ɵb = LaboratoryEditComponent;
    exports.ɵc = LaboratoryResolve;
    exports.ɵd = ROUTES;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=lamis-laboratory-1.1.0.umd.js.map
