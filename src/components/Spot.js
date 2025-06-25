
/**
 * @author Ethan Harris
 * @purpose Represents a spot; an entry on the map.
 * @date Apr 17, 2024
 */
export default class Spot {
    constructor(name, description, lat, lng, img, difficulty, rating, email) {
        this.name = name;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.img = img;
        this.difficulty = difficulty;
        this.rating = rating;
        this.email = email;
    }
    
    // Setters
    setName(name) {
        this.name = name;
    }
    setDescription(desc) {
        this.description = desc;
    }
    setLat(lat) {
        this.lat = lat;
    }
    setLng(lng) {
        this.lng = lng;
    }
    setPos(lat, lng) {
        // Set position from separate latitude and longitude values.
        this.lat = lat;
        this.lng = lng;
    }
    setPosFromLatLng(latLng) {
        // Set position from Google Maps API latLng object.
        this.lat = latLng.lat();
        this.lng = latLng.lng();
    }
    setImg(url) {
        this.img = url;
    }
    setDifficulty(diff) {
        this.difficulty = diff;
    }
    setRating(rating) {
        this.rating = rating;
    }
    setCreatedBy(email) {
        this.email = email;
    }

    // Getters
    pos() {
        // Returns Maps API Lat/Lng object literal as {lat, lng}.
        return {lat: this.lat, lng: this.lng};
    }
    fixedLat() {
        // Returns lat rounded to 6 decimal places;
        // lat & lng stored in the database should be this length.
        return this.lat.toFixed(6);
    }
    fixedLng() {
        // Returns lng rounded to 6 decimal places
        return this.lng.toFixed(6);
    }
    getDisplayPos() {
        // Returns position as a string in the format "lat, lng" each rounded to 6 decimal places.
        return (
            this.fixedLat().toString()
            + ", "
            + this.fixedLng().toString()
        );
    }
    getLogString() {
        // Returns object as a readable string, useful for debugging.
        return (
            "\tName: " + this.name + "\n" +
            "\tDesc: " + this.description + "\n" +
            "\tPos: " + this.getDisplayPos() + "\n" +
            "\tImg: " + this.img + "\n" +
            "\tDiff: " + this.difficulty + "\n" +
            "\tRating: " + this.rating + "\n" +
            "\tCreated by: " + this.email + "\n"
        );
    }
}

export class MapSpot extends Spot {
    constructor(name, description, lat, lng, img, difficulty, rating, email) {
        super(name, description, lat, lng, img, difficulty, rating, email);
        this.visible = true;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}