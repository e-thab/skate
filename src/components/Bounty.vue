    <!-- Author: William Troscher -->
    <!-- Testing Author: William Troscher -->
    <!-- Purpose: Create oppertunity for healthy competition among users by allowing for points system -->

    <template>
      <div class="container">
        <h1>Bounty Tricks</h1>
        <div class="team-container">
          <div class="team">
            <h2>Red Team</h2>
            <p>{{ redScore }}</p>
          </div>
          <div class="team">
            <h2>Blue Team</h2>
            <p>{{ blueScore }}</p>
          </div>
          <div class="team">
            <h2>Yellow Team</h2>
            <p>{{ yellowScore }}</p>
          </div>
        </div>
        <!-- Purpose: Submits the form, updates scores, and calls necessary API endpoints -->
        <form class="form" @submit.prevent="submitForm">
          <label>
            I performed a:
            <select v-model="selectedTrick">
              <option v-for="trick in tricks" :key="trick">{{ trick }}</option>
            </select>
          </label>
          <span> for </span>
          <label>
            <input type="radio" v-model="selectedTeam" value="red"> Red
          </label>
          <label>
            <input type="radio" v-model="selectedTeam" value="blue"> Blue
          </label>
          <label>
            <input type="radio" v-model="selectedTeam" value="yellow"> Yellow
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </template>
    
    <script>
    import { supabase } from '@/lib/supabaseClient';
// import axios from 'axios';
    
    export default {
      data() {
        return {
          redScore: 0,
          blueScore: 0,
          yellowScore: 0,
          selectedTrick: '',
          selectedTeam: ''
        };
      },
      
      async created() {
        // try {
        //   const response = await axios.get('http://localhost:8000/user/api/bounty');
        //   const { redScore, blueScore, yellowScore } = response.data;
        //   this.redScore = redScore;
        //   this.blueScore = blueScore;
        //   this.yellowScore = yellowScore;
        // } catch (error) {
        //   console.error('Error fetching team scores: ', error);
        // }
        const { data: redData, error: redErr } = await supabase
          .from('team_scores')
          .select('score')
          .eq('team', 'red')
        if (redErr) {
          console.error("Error getting red team score:", error)
        } else {
          // console.log('red score: ', redData[0].score)
          this.redScore = redData[0].score
        }

        const { data: blueData, error: blueErr } = await supabase
          .from('team_scores')
          .select('score')
          .eq('team', 'blue')
        if (blueErr) {
          console.error("Error getting blue team score:", error)
        } else {
          // console.log('blue score: ', blueData[0].score)
          this.blueScore = blueData[0].score
        }

        const { data: yellowData, error: yellowErr } = await supabase
          .from('team_scores')
          .select('score')
          .eq('team', 'yellow')
        if (yellowErr) {
          console.error("Error getting yellow team score:", error)
        } else {
          // console.log('yellow score: ', yellowData[0].score)
          this.yellowScore = yellowData[0].score
        }
        
      },
      
      methods: {
        async submitForm() {
          // try {
          let selectedScore = 0;
          switch (this.selectedTeam) {
            case 'red':
              this.redScore++;
              selectedScore = this.redScore;
              break;
            case 'blue':
              this.blueScore++;
              selectedScore = this.blueScore;
              break;
            case 'yellow':
              this.yellowScore++;
              selectedScore = this.yellowScore;
              break;
            default:
              return;
          }

          const { error } = await supabase
            .from('team_scores')
            .update({ score: selectedScore})
            .eq('team', this.selectedTeam)
          if (error) {
            console.error("Error updating red team score:", error)
          }
    
            // const userEmail = this.getUserEmail();
    
            // if (userEmail) {
            //   const isTeamed = await axios.post('http://localhost:8000/isTeamed', {
            //     email: userEmail
            //   });
    
            //   if (isTeamed && isTeamed.data && isTeamed.data.team) {
            //     this.selectedTeam = isTeamed.data.team;
            //   }
            // }
    
            // await axios.post('http://localhost:8000/updateTeamScores', {
            //   team: this.selectedTeam,
            //   score: 1
            // });
    
            // console.log('Form submitted successfully');
          // } catch (error) {
          //   console.error('Error submitting form: ', error);
          // }
        },
        
        // getUserEmail() {
        //   return 'firstentry@gmail.com';
        // },
    
        // =============
        // Whitebox Testing
        // =============
        
        testSubmitForm(team) {
          const initialRedScore = this.redScore;
          const initialBlueScore = this.blueScore;
          const initialYellowScore = this.yellowScore;
    
          this.redScore = team === 'red' ? 0 : initialRedScore;
          this.blueScore = team === 'blue' ? 0 : initialBlueScore;
          this.yellowScore = team === 'yellow' ? 0 : initialYellowScore;
          this.selectedTeam = team;
    
          this.submitForm();
    
          if (
            (team === 'red' && this.redScore === 1 && this.blueScore === initialBlueScore && this.yellowScore === initialYellowScore) ||
            (team === 'blue' && this.redScore === initialRedScore && this.blueScore === 1 && this.yellowScore === initialYellowScore) ||
            (team === 'yellow' && this.redScore === initialRedScore && this.blueScore === initialBlueScore && this.yellowScore === 1)
          ) {
            switch (team) {
              case 'red':
                this.redScore = initialRedScore;
                console.log('Red team submission test passed!');
                break;
              case 'blue':
                this.blueScore = initialBlueScore;
                console.log('Blue team submission test passed!');
                break;
              case 'yellow':
                this.yellowScore = initialYellowScore;
                console.log('Yellow team submission test passed!');
                break;
              default:
                break;
            }
          } else {
            switch (team) {
              case 'red':
                console.error('Red team submission test failed!');
                break;
              case 'blue':
                console.error('Blue team submission test failed!');
                break;
              case 'yellow':
                console.error('Yellow team submission test failed!');
                break;
              default:
                break;
            }
          }
        }
      },
      
      computed: {
        tricks() {
          return ['Ollie', 'Kickflip', 'Heelflip', 'Pop Shove-it', 'Tre Flip', 'Varial Flip', 'Backside Flip', 'Frontside Flip', 'Nollie', 'Switch Heelflip'];
        }
      },
    
      mounted() {
        // this.testSubmitForm('red');
        // this.testSubmitForm('blue');
        // this.testSubmitForm('yellow');
      }
    }; //End of Whitebox testing
    </script>
    
    <style>
    .container {
      text-align: center;
    }
    
    .team-container {
      display: flex;
      justify-content: space-around;
    }
    
    .team {
      margin-bottom: 20px;
    }
    
    .form {
      margin-top: 20px;
    }
    </style>
    