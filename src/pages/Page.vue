<script>
import BasePage from "./BasePage.vue";
import axios from "axios";

export default {
  name: "Page",
  extends: BasePage,
  methods: {
    buildDamage(relation_type, response) {
      return (
        this.buildJointString(
          response.data.damage_relations[relation_type],
          "name"
        ) || "none"
      );
    },
    buildFlavors(data, property) {
      this.jointFlavors = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].potency > 0) {
          if (arguments[2]) {
            this.jointFlavors.push(data[i][property][arguments[2]]);
          } else {
            this.jointFlavors.push(data[i][property]);
          }
        }
      }
      return this.jointFlavors.join(", ");
    },
    buildJointString(data, property) {
      this.jointString = [];
      for (var i = 0; i < data.length; i++) {
        if (arguments[2]) {
          this.jointString.push(data[i][property][arguments[2]]);
        } else {
          this.jointString.push(data[i][property]);
        }
      }
      return this.jointString.join(", ");
    },
    buildStats(stats) {
      this.jointStats = [];
      for (var i = 0; i < stats.length; i++) {
        this.jointStats.push(`${stats[i].stat.name}: ${stats[i].base_stat}`);
      }
      return this.jointStats.join(", ");
    },
    capitalize(s) {
      return s[0].toUpperCase() + s.slice(1);
    },
    getOptions() {
      if (this.$route.name === "pokemon") {
        return [
          { value: null, text: "Please select species or types" },
          { value: "pokemon", text: "Species" },
          { value: "type", text: "Types" }
        ];
      }
      if (this.$route.name === "moves") {
        return [
          { value: null, text: "Please select moves or ailments" },
          { value: "move", text: "Moves" },
          { value: "move-ailment", text: "Ailments" }
        ];
      }
      this.form.selected = "berry";
      return null;
    },
    getSearchSubject() {
      if (this.$route.name === "pokemon") {
        return "species or type";
      }
      if (this.$route.name === "moves") {
        return "move or ailment";
      }
      return "berry";
    },
    getItems(response) {
      if (this.$route.name === "pokemon") {
        if (this.form.selected === "type") {
          return [
            {
              "Half damage from": this.buildDamage(
                "half_damage_from",
                response
              ),
              "Half damage to": this.buildDamage("half_damage_to", response),
              "Double damage from": this.buildDamage(
                "double_damage_from",
                response
              ),
              "Double damage to": this.buildDamage(
                "double_damage_to",
                response
              ),
              "No damage from": this.buildDamage("no_damage_from", response),
              "No damage to": this.buildDamage("no_damage_to", response),
              "Move example": response.data.moves[0].name || "unknown",
              "Species example":
                this.capitalize(response.data.pokemon[0].pokemon.name) ||
                "unknown"
            }
          ];
        }
        return [
          {
            Abilities:
              this.buildJointString(
                response.data.abilities,
                "ability",
                "name"
              ) || "unknown",
            "Move example":
              response.data.moves[0].move.name.replace("_", " ") || "unknown",
            Stats: this.buildStats(response.data.stats) || "unknown",
            Height: response.data.height || "unknown",
            Weight: response.data.weight || "unknown",
            Type:
              this.buildJointString(response.data.types, "type", "name") ||
              "unknown"
          }
        ];
      }
      if (this.$route.name === "moves") {
        if (this.form.selected == "move-ailment") {
          return [
            {
              "Move examples": this.buildJointString(
                response.data.moves.slice(0, 3),
                "name"
              )
            }
          ];
        }
        return [
          {
            Accuracy: response.data.accuracy || "unknown",
            Ailment: response.data.meta.ailment.name || "unknown",
            "Critical rate": response.data.crit_rate || "unknown",
            "Damage class": response.data.damage_class.name || "unknown",
            "Effect chance": response.data.effect_chance || "unknown",
            Power: response.data.power || "unknown",
            Type: response.data.type.name || "unknown"
          }
        ];
      }
      return [
        {
          Flavor:
            this.buildFlavors(response.data.flavors, "flavor", "name") ||
            "unknown",
          Firmness: response.data.firmness.name.replace("_", " ") || "unknown",
          "Growth time": response.data.growth_time || "unknown",
          "Max harvest": response.data.max_harvest || "unknown",
          Size: response.data.size || "unknown",
          Type: response.data.natural_gift_type.name || "unknown"
        }
      ];
    },
    isFormValid(e) {
      e.preventDefault();

      if (!this.form.selected | !this.form.searchText) {
        this.selectState = this.form.selected ? null : false;
        this.searchTextState = this.form.searchText ? null : false;
        return false;
      }

      return true;
    },
    makeRequest() {
      this.showForm = false;
      this.showLoader = true;
      axios
        .get(
          `https://pokeapi.co/api/v2/${this.form.selected}/${
            this.form.searchText
          }/`,
          {
            headers: { Accept: "application/json" }
          }
        )
        .then(response => {
          this.showLoader = false;
          this.cardTitle = `<b>${this.capitalize(
            response.data.name.replace("-", " ")
          )}</b>`;
          this.items = this.getItems(response);
          this.showResult = true;
          this.resetForm();
        })
        .catch(error => {
          this.showLoader = false;
          this.showDismissibleAlert = true;
          this.resetForm();
          this.showForm = true;
        });
    },
    resetForm() {
      this.form.searchText = "";
      this.form.selected = null;
      this.selectState = null;
      this.searchTextState = null;
    },
    submit(e) {
      if (this.isFormValid(e)) {
        this.form.searchText = this.form.searchText
          .toLowerCase()
          .replace(" ", "-");
        this.makeRequest();
      }
    }
  },
  watch: {
    $route(to, from) {
      this.showForm = true;
      this.showResult = false;
      this.resetForm();
    }
  }
};
</script>
