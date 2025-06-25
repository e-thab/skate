/**
 * @author Ethan Harris
 * @purpose Represents the spot being submitted by the user.
 * @date Apr 17, 2024
 */
import { reactive } from 'vue';
import Spot from '@/components/Spot';

class SubmitSpot extends Spot {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.name = "";
        this.description = "";
        this.lat = -1;
        this.lng = -1;
        this.img = "";
        this.difficulty = "";
        this.rating = "";
    }
}

// When the user starts submitting a spot, the data is stored in this object,
// accessible globally by importing {activeSubmitSpot} from this file.
export const activeSubmitSpot = reactive(new SubmitSpot);