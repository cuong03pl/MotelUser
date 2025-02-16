import axios from "axios";
import React, { useEffect, useState } from "react";
import { convertTime } from "../../utils/convertTime";

export default function CommentItem({ comment }) {
  return (
    <div class="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
      <img src={comment?.user?.avatar} class="w-10 h-10 rounded-full" />
      <div>
        <p class="font-semibold">{comment?.user?.fullName}</p>
        <p class="text-gray-700">{comment?.comment}</p>
        <span class="text-sm text-gray-500">
          {convertTime(comment?.createAt)}
        </span>
      </div>
    </div>
  );
}
