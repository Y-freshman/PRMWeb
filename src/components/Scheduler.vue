<template>
  <div ref="scheduler"></div>
</template>

<script>
  import 'dhtmlx-scheduler'
  import 'dhtmlx-scheduler/codebase/dhtmlxscheduler'
  import 'dhtmlx-scheduler/codebase/locale/locale_cn'
  import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css'
  // import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_terrace.css'
  export default {
    name: 'scheduler',
    props: {
      events: {
        type: Array,
        default () {
          return {events: []}
        }
      }
    },

    methods: {
      $_initSchedulerEvents: function() {
          scheduler.attachEvent("onEventAdded", (id, ev) => {
            this.$emit("event-updated", id, "inserted", ev);
          });
          scheduler.attachEvent("onEventChanged", (id, ev) => {
            this.$emit("event-updated", id, "updated", ev);
          });
          scheduler.attachEvent("onEventDeleted", (id, ev) => {
            this.$emit("event-updated", id, "deleted");
          });
        }
    },
    mounted: function () {
      scheduler.skin = "terrace";
      scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "today",
        "prev",
        "next"
      ];
      this.$_initSchedulerEvents();
      scheduler.config.time_step = 1440;
      scheduler.config.full_day = true;
      scheduler.init(this.$refs.scheduler, new Date(), "month");
      scheduler.templates.lightbox_header = function(start,end,ev){
        return scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
      };
    }
  }
</script>

<style>

</style>
