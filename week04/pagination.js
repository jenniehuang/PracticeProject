export default {
    template: `<nav aria-label="Page navigation example">
  <ul class="pagination" >
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="num in pages.total_pages" :key="num" :class="{active: pages.current_page == num }">
    <a class="page-link" href="#" @click.prevent="getPage(num)">{{num}}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>`
    ,
    data: function () {
      return {
        count: 0
      }
    },
    props:['pages'],
    methods:{
        getPage(index){
            this.$emit('push', index )
            console.log();
        }


    }
  }