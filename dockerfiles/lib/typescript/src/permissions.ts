/*
 * Copyright (c) 2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */


import {AuthData} from "./auth-data";
import {PermissionDto} from "./dto/permissiondto";
import {Log} from "./log";
import {HttpJsonRequest} from "./default-http-json-request";
import {DefaultHttpJsonRequest} from "./default-http-json-request";
import {HttpJsonResponse} from "./default-http-json-request";
import {DomainDto} from "./dto/domaindto";
/**
 * Defines communication with remote Permissions API
 * @author Florent Benoit
 */
export class Permissions {

    /**
     * Authentication data
     */
    authData : AuthData;


    constructor(authData : AuthData) {
        this.authData = authData;
    }


    /**
     * list all permissions
     */
    listPermissions() : Promise<Array<DomainDto>> {

        var jsonRequest : HttpJsonRequest = new DefaultHttpJsonRequest(this.authData, '/api/permissions', 200);
        return jsonRequest.request().then((jsonResponse : HttpJsonResponse) => {
            let domainsDto : Array<DomainDto>  = new Array<DomainDto>();
            JSON.parse(jsonResponse.getData()).forEach((entry)=> {
                domainsDto.push(new DomainDto(entry));
            });
            return domainsDto;
        });
    }


    /**
     * get permissions for a given domain
     */
    getPermission(domain: string) : Promise<PermissionDto> {

        var jsonRequest : HttpJsonRequest = new DefaultHttpJsonRequest(this.authData, '/api/permissions/' + domain, 200);
        return jsonRequest.request().then((jsonResponse : HttpJsonResponse) => {
           return new PermissionDto(JSON.parse(jsonResponse.getData()));
        }, (error) => {
            console.log('we have the error on getPermission, return empty', error);
            return new PermissionDto({});
        });
    }

    updatePermissions(permissionDto: PermissionDto) {
        var jsonRequest : HttpJsonRequest = new DefaultHttpJsonRequest(this.authData, '/api/permissions', 204);
        return jsonRequest.setMethod('POST').setBody(permissionDto.getContent()).request().then((jsonResponse : HttpJsonResponse) => {
            return new PermissionDto(jsonResponse.getData());
        });
    }

}