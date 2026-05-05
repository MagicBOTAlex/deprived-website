<script lang="ts">
  import re from "@ts/Redaction/Redactor";
</script>

<a
  href="/cv?hideOnPrint=1"
  target="_blank"
  class="flex w-45 justify-center text-nowrap text-center text-base md:w-auto md:text-left"
>
  {$re?.nick ?? "Alex"}'s CV
</a>
<a
  href="/school"
  class="flex w-45 justify-center text-nowrap text-center text-base md:w-auto md:text-left"
>
  School Stuff
</a>
