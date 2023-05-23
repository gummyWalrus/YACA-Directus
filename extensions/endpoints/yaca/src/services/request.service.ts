/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - David PISTORI <david.pistori@indigen.com>
 * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartins@indigen.com>
 * NOTICE: All information contained here is, and remains
 * the property of Indigen Solutions and its suppliers, if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

import {
    IMortalitySimulationResult,
    ISimulationResult,
} from "../types/ISimulationResult";
import harvestService from "./harvest.service";
import { ApiException } from "../exceptions/ApiException";
import { ISimulationRequest } from "../types/ISimulationRequest";
import { HarvestResultBuilder } from "../builder/HarvestResult.builder";
import { HarvestRequestBuilder } from "../builder/HarvestRequest.builder";
import { HarvestMortalityResultBuilder } from "../builder/HarvestMortalityResult.builder";
import { HarvestMortalityRequestBuilder } from "../builder/HarvestMortalityRequest.builder";
import apicilService from "./apicil.service";
import { SubscriptionService } from "./subscription.service";
import { UserService } from "./user.service";
import { IApicilProject } from "../types/IApicilResponse";

export class RequestService {
    public async calculateSimulation(request: any): Promise<ISimulationResult> {
        if (!this._checkSimulationRequest(request)) {
            throw new ApiException("Invalid request");
        }

        const harvestRequest = new HarvestRequestBuilder()
            .setRequest(request)
            .build();

        const harvestResult = await harvestService.executeSimulation(
            harvestRequest
        );

        return new HarvestResultBuilder().setApiResult(harvestResult).build();
    }

    public async calculateMortalitySimulation(
        request: any
    ): Promise<IMortalitySimulationResult> {
        if (!this._checkSimulationRequest(request)) {
            throw new ApiException("Invalid request");
        }

        const harvestMortalityRequest = new HarvestMortalityRequestBuilder()
            .setRequest(request)
            .build();

        const harvestMortalityResult =
            await harvestService.executeMortalitySimulation(
                harvestMortalityRequest
            );
        return new HarvestMortalityResultBuilder()
            .setApiResult(harvestMortalityResult)
            .build();
    }

    public async getProfessions() {
        return await harvestService.getProfessions();
    }

    private _checkSimulationRequest(_request: ISimulationRequest) {
        // TODO check params integrity.
        return true;
    }

    public async getCurrentUserProject(_req : any) : Promise<IApicilProject | null> {
        const userService = new UserService(_req);
            const subscriptionService = new SubscriptionService(_req);

            const user = await userService.getCurrentUser();
            if (!user) {
                return null;
            }
            const subscription = await subscriptionService.getUserSubscription(
                user
            );

            if (!subscription && !subscription!.apicil_project_id) {
                return null;
            }

            return await apicilService.getProject(
                subscription!.apicil_project_id
            );

    }
}

const requestService = new RequestService();
export default requestService;
